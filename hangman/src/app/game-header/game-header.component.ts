import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuService } from '../services/menu.service';
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './game-header.component.html',
  styles: ``
})
export class GameHeaderComponent implements OnInit {

  category: string = "Category";

  constructor(private route: ActivatedRoute, private menuService: MenuService, public gameService: GameService) { }

  openMenu() {
    this.menuService.openMenu();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = decodeURIComponent(params['category']);
    });
  }
}
