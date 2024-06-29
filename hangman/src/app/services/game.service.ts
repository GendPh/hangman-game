import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data } from '../model/categories.model';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private url: string = 'assets/data.json';

  public chances: number = 5;
  public lifeSignal = signal<number>(this.chances * 20);

  private wordSubject: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);
  public word$: Observable<string[][]> = this.wordSubject.asObservable();
  public winStateSignal = signal<boolean>(false);
  public lostStateSignal = signal<boolean>(false);
  public damagedSignal = signal<boolean>(false);

  public lettersSelected: string[] = [];

  private playingWord: string = "";
  private playingCategory: string = "";

  constructor(private http: HttpClient, private menuService: MenuService) {
    // Initialize the game when the service is created
    this.initGame();
  }

  //Method to initialize the game
  public initGame(): void {
    // Verify if the local storage is exist and if not create it
    this.initializeLocalStorage();

    // Set the chances to 5 and update the life signal
    this.chances = 5;
    this.lifeSignal.update((life) => this.chances * 20);

    // Reset the selections
    this.lettersSelected = [];
    this.wordSubject.next([]);

    // Reset the win and lost signals
    this.winStateSignal.update((state) => false);
    this.lostStateSignal.update((state) => false);

    // Reset the playing word and category
    this.playingWord = "";
    this.playingCategory = "";
  }
  //Method to initialize the local storage
  private initializeLocalStorage(): void {
    if (localStorage.getItem('game') == null) {
      const initialData = {
        categories: {
          Movies: [],
          "Tv Shows": [],
          Countries: [],
          "Capital Cities": [],
          Animals: [],
          Sports: [],
        }
      };
      // Convert the data to a JSON string
      const jsonData = JSON.stringify(initialData);
      // Store the initial data in localStorage
      localStorage.setItem('game', jsonData);
    }
  }
  //Method to check if the word is already played
  private checkWordAlreadyPLayed(word: string): boolean {
    // Retrieve existing data
    const data = JSON.parse(localStorage.getItem('game') || '[]');
    // Get the category
    const categories = data.categories[this.playingCategory];
    // Check if the category exists
    if (!categories) {
      return false;
    }
    // Check if the word is already played
    if (categories.some((item: any) => item.name === word)) {
      return true;
    }

    return false;
  }
  //Method to add the word to the local storage when the player wins
  private addWordToLocalStorage(): void {
    // Retrieve existing data
    let data = JSON.parse(localStorage.getItem('game') || '[]');

    // Ensure the category exists
    if (!data.categories[this.playingCategory]) {
      data.categories[this.playingCategory] = [];
    }

    // Add new item to the specified this.playingCategory
    data.categories[this.playingCategory].push({ name: this.playingWord });

    // Store the updated data back to localStorage
    localStorage.setItem('game', JSON.stringify(data));
  }
  private restartCategory(): void {
    // Retrieve existing data
    let data = JSON.parse(localStorage.getItem('game') || '[]');
    // reset the category
    data.categories[this.playingCategory] = [];
    // Store the updated data back to localStorage
    localStorage.setItem('game', JSON.stringify(data));
  }


  //Method to set the category word
  public setCategoryWord(category: string): Observable<boolean> {
    // When the game is started, the playing category is set conform the parameter
    this.playingCategory = category;

    // Returns true if the category is found
    return this.http.get<Data>(this.url).pipe(
      map((data: Data) => {
        // Get the categories
        const categories = data.categories[category];
        // array tha will contain the word
        let words: string[] = [];

        // Check if the category is found
        if (!categories) {
          return false;
        }

        let i: number = 0;

        while (i < categories.length) {
          // Check if the last word played is different from the current word
          if (!this.checkWordAlreadyPLayed(categories[i].name)) {
            // Set the playing word
            this.playingWord = categories[i].name;

            // Divide the string into an array of words if as multiple words
            words = categories[i].name.toLocaleLowerCase().split(' ');

            // Emit the word splitted into an array of letters depending of how many words contain
            this.wordSubject.next(words.map(w => w.split('')));

            // Stops the loop
            i = categories.length + 1;
          }

          // Check if the loop is at the end
          if (i === categories.length - 1) {
            this.restartCategory();
            i = 0;
          } else {
            i++;
          }
        }

        // Return true if the category is found
        return true;
      })
    );
  }
  //Method to check when the letter is click to verify if the letter exist in the word
  public checkLetter(letter: string): void {
    // Check if the player has chances
    if (this.chances != 0) {
      // Transform the letter to lower case
      const lowerLetter = letter.toLocaleLowerCase();

      // Check if the letter contains in the word
      // if true add the letter to the selected letters
      if (this.wordSubject.value.some(word => word.includes(lowerLetter))) {
        this.lettersSelected.push(lowerLetter);

        // if false decrease the chances
      } else {
        // Emit the damaged signal
        this.damagedSignal.update((state) => true);
        setTimeout(() => {
          this.damagedSignal.update((state) => false);
        }, 500);

        // Decrease the chances
        this.chances--;

        // Update the life signal
        this.lifeSignal.update((life) => life - 20);

        // if the player as no more chances the player loses
        if (this.chances === 0) {
          // Emit the lost signal
          this.lostStateSignal.update((state) => true);
          this.menuService.openMenu();
          return;
        }
      }

      // Check if the player won
      if (this.checkWinCondition()) {
        // Emit the win signal
        this.winStateSignal.update((state) => true);
        this.menuService.openMenu();
        this.addWordToLocalStorage();
      }
    }
  }
  //Method to check if the player won
  public checkWinCondition(): boolean {
    // Check if all the letters in the word are in the selected letters array
    return this.wordSubject.value.every(word => word.every(letter => this.lettersSelected.includes(letter)));
  }
}
