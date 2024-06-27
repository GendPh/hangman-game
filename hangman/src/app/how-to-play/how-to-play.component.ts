import { Component, } from '@angular/core';
import { RouterLink, } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RulesComponent } from '../rules/rules.component';

@Component({
  selector: 'app-how-to-play',
  standalone: true,
  imports: [RouterLink, HeaderComponent,RulesComponent],
  templateUrl: './how-to-play.component.html',
  styles: ``
})
export class HowToPlayComponent {

}
