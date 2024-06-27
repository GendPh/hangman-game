import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styles: ``
})
export class GameBoardComponent {
  @Input('GetWord') word: string[][] = [];

}
