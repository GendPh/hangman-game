import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {
  won: boolean = false;
  lost: boolean = false;

  constructor(
    public gameService: GameService,
    public menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  reloadGame() {
    // Close the menu
    this.menuService.closeMenu();

    // Store the current URL
    const currentUrl = this.router.url;

    // Define the category variable
    let category: string = "";

    // Subscribe to route params to get the 'category' parameter value
    this.route.params.subscribe(params => {
      category = params['category']; // No need to decodeURIComponent here
    });

    // Reload the route to reset the game with the new category parameter
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate to the current URL with the updated category parameter
      this.router.navigate([currentUrl.split('/').slice(0, -1).join('/') + '/' + category]);
    });
  }


}
