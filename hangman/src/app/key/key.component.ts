import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './key.component.html',
  styles: ``
})
export class KeyComponent {
  @Input('GetLetter') letter: string = "A";
  @Input('GetDisabled') disabled: boolean = false;

  constructor(private gameService: GameService) { }

  checkLetter() {
    if (this.gameService.checkLetter(this.letter)) {
      this.disabled = true;
      console.log('Correct');
    }
  }
}
