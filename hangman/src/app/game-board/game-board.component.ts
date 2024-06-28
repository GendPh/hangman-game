import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styles: ``
})
export class GameBoardComponent {
  @Input('GetWord') word: string[][] = [];
  
  constructor(public gameService: GameService) { }
}
