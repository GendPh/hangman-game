import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { GameHeaderComponent } from '../game-header/game-header.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { GameKeysComponent } from '../game-keys/game-keys.component';
import { mirage } from 'ldrs'
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, GameHeaderComponent, GameBoardComponent, GameKeysComponent],
  templateUrl: './game.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class GameComponent implements OnInit, OnDestroy {

  load: boolean = false;
  loadFail: boolean = false;
  words: string[][] = [];

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    public gameWord: GameService
  ) { }

  ngOnInit(): void {
    mirage.register()

    this.route.params.subscribe(params => {
      const category = params['category'];

      this.gameService.setCategoryWord(category).subscribe(
        {
          next: (result) => {
            // Load
            if (result) {
              this.gameWord.word$.subscribe(word => {
                this.words = word;
              })
            } else {
              this.loadFail = true;
            }
          },
          error: () => {
            // Failed
            this.loadFail = true;
          },
          complete: () => {
            // Completed
            setTimeout(() => {
              this.load = true;
            }, 1000);
          }
        }
      );
    });
  }

  reset() {
    this.load = false;
    this.loadFail = false;
    this.words = [];
  }

  ngOnDestroy(): void {
    this.reset();
    this.gameService.initGame();
  }
}
