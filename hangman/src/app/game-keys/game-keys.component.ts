import { Component } from '@angular/core';
import { KeyComponent } from '../key/key.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-keys',
  standalone: true,
  imports: [CommonModule, KeyComponent],
  templateUrl: './game-keys.component.html',
  styles: ``
})
export class GameKeysComponent {
  buttonLetters: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}


