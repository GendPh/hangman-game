import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [],
  templateUrl: './game-header.component.html',
  styles: ``
})
export class GameHeaderComponent implements OnInit {

  category: string = "Category";
  life: number = 100;
  constructor() { }

  ngOnInit(): void {
    
  }
}
