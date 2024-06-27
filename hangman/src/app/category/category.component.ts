import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './category.component.html',
  styles: ``
})
export class CategoryComponent {
  @Input("GetCategory") category: string = "none";
}
