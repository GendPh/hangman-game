import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './game-header.component.html',
  styles: ``
})
export class GameHeaderComponent implements OnInit {

  category: string = "Category";
  life: number = 100;

  constructor(private menuService: MenuService) { }

  openMenu() {
    this.menuService.openMenu();
  }

  ngOnInit(): void {

  }
}
