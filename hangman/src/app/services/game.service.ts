import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Animal, Data } from '../model/categories.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private url: string = 'assets/data.json';

  public chances: number = 5;

  /* public life: number = this.chances * 20; */

  private wordSubject: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);
  public word$: Observable<string[][]> = this.wordSubject.asObservable();

  private win: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public win$: Observable<boolean> = this.win.asObservable();

  private lost: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public lost$: Observable<boolean> = this.lost.asObservable();

  public lettersSelected: string[] = [];


  private lastWordPlayedIndex: number = -1;

  constructor(private http: HttpClient) { }

  // Return a word from a specific category
  setCategoryWord(category: string): Observable<boolean> {
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

        // Loop through the categories
        for (let i = 0; i < categories.length; i++) {
          // Check if the last word played is different from the current word
          if (this.lastWordPlayedIndex != i) {
            // Divide the string into an array of words if as multiple words
            words = categories[i].name.toLocaleLowerCase().split(' ');
            // Emit the word splitted into an array of letters depending of how many words contain
            this.wordSubject.next(words.map(w => w.split('')));
            // Save the last word played index
            this.lastWordPlayedIndex = i;
            // Stops the loop
            break;
          }
        }

        // Return true if the category is found
        return true;
      })
    );
  }

  //Check if the letter is in the word
  checkLetter(letter: string): void {
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
        // Decrease the chances
        this.chances--;

        // if the player as no more chances the player loses
        if (this.chances === 0) {
          // Emit the lost signal
          this.lost.next(true);
          return;
        }
      }

      // Check if the player won
      if (this.checkWinCondition()) {
        // Emit the win signal
        this.win.next(true);
      }
    }
  }

  // Check if the player won
  checkWinCondition(): boolean {
    // Check if all the letters in the word are in the selected letters array
    return this.wordSubject.value.every(word => word.every(letter => this.lettersSelected.includes(letter)));
  }

  reset(): void {
    this.chances = 5;
    this.lettersSelected = [];
    this.wordSubject.next([]);
    this.win.next(false);
    this.lost.next(false);
  }
}
