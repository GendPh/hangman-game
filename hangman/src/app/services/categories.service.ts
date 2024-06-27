import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Data } from '../model/categories.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url: string = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getCategoriesTitles(): Observable<string[]> {
    return this.http.get<Data>(this.url).pipe(map(data => Object.keys(data.categories)));
  }
}

