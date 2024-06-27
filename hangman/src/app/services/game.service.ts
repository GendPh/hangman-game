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

  // Assuming you have a custom signal implementation or using BehaviorSubject
  private wordSubject: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);
  public word$: Observable<string[][]> = this.wordSubject.asObservable();

  private lastWordPlayedIndex: number = -1;

  constructor(private http: HttpClient) { }

  setCategoryWord(category: string): Observable<boolean> {
    return this.http.get<Data>(this.url).pipe(
      map((data: Data) => {
        const categories = data.categories[category];
        let words: string[] = [];
        for (let i = 0; i < categories.length; i++) {
          if (this.lastWordPlayedIndex != i) {
            words = categories[i].name.toLocaleLowerCase().split(' ');
            this.wordSubject.next(words.map(w => w.split('')));
            break;
          }
        }

        return true; // Return the categories if needed
      })
    );
  }

  checkLetter(letter: string): boolean {

    const lowerLetter = letter.toLocaleLowerCase();
    console.log(this.wordSubject.value);
    
    if (this.wordSubject.value.some(word => word.includes(lowerLetter))) {
      console.log('Correct');
    } else {
      console.log('Incorrect');
    }

    return this.wordSubject.value.some(word => word.includes(lowerLetter));
  }
}
