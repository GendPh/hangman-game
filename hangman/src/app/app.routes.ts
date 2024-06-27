import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { CategoriesComponent } from './categories/categories.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home" },
  { path: "how-to-play", component: HowToPlayComponent, title: "How to Play" },
  { path: "categories", component: CategoriesComponent, title: "Category" },
  { path: "game/:category", component: GameComponent, title: "Game" },
  { path: "**", redirectTo: "" }
];
