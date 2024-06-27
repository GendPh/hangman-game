import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CategoryComponent } from '../category/category.component';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { bouncy } from 'ldrs'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CategoryComponent],
  templateUrl: './categories.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ``
})

export class CategoriesComponent implements OnInit, OnDestroy {

  categories: string[] = [];
  categoriesLoaded: boolean = false;
  categoriesError: boolean = false;
  errorMessage: string = "";

  constructor(
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    bouncy.register();

    // Get the categories from the service to get the data and handle errors
    this.categoriesService.getCategoriesTitles().subscribe(
      {
        next: (data) => {
          // If there are no categories, set the error message
          if (data.length === 0) {
            this.categoriesError = true;
            this.errorMessage = "No categories found";
          }
          this.categories = data;
        },
        // If there is an error, set the error message and set the categoriesError flag to true
        error: (error) => {
          this.errorMessage = error;
          this.categoriesError = true;
        },
        // When the observable is complete, set the categoriesLoaded flag to true
        complete: () => {
          this.categoriesLoaded = true;
        }
      }
    );
  }

  // Reset the categories and error flags
  resetSubs() {
    this.categoriesLoaded = false;
    this.categoriesError = false;
    this.errorMessage = "";
    this.categories = [];
  }

  // Reset the categories and error flags when the component is destroyed
  ngOnDestroy(): void {
    this.resetSubs();
  }

}
