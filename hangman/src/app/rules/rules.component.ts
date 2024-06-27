import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [],
  templateUrl: './rules.component.html',
  styles: ``
})
export class RulesComponent {
  @Input("GetIndex") index: string = "1";
  @Input("GetTitle") title: string = "choose a category";
  @Input("GetRules") rule: string = "First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.";
}
