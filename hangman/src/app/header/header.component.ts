import { Component, Input } from '@angular/core';
import { RouterLink, } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  @Input("GetRouterLink") RouterLink: string = "/";
  @Input("GetTitle") title: string = "How To Play";
}
