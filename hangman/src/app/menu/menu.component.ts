import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {
  menuOpen: boolean = false;
  won: boolean = false;
  lost: boolean = false;

  constructor(
    public gameService: GameService,
    public menuService: MenuService
  ) {
    menuService.menu$.subscribe(menu => {
      this.menuOpen = menu;
    });
    gameService.win$.subscribe(win => {
      this.won = win;
    });
    gameService.lost$.subscribe(lost => {
      this.won = lost;
    });
  }

}
