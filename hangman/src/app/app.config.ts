import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CategoriesService } from './services/categories.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { GameService } from './services/game.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    CategoriesService,
    GameService
  ]
};
