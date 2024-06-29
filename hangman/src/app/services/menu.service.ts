import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menuStateSignal = signal<boolean>(false);

  constructor() { }

  openMenu() {
    this.menuStateSignal.update((state) => true);
  }

  closeMenu() {
    this.menuStateSignal.update((state) => false);
  }
}
