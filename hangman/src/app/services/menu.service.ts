import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public menu$: Observable<boolean> = this.menuSubject.asObservable();

  constructor() { }

  openMenu() {
    this.menuSubject.next(true);
  }
  
  closeMenu() {
    this.menuSubject.next(false);
  }
}
