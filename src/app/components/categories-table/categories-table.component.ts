import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { WordCategory } from '../../shared/model/Word-category';
import { Language } from '../../shared/model/Language';
import { TranslatedWord } from '../../shared/model/Translated-word ';
import { CategoryServiceModule } from '../../service/category-service/category-service.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatIconModule],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
})
export class CategoriesTableComponent {
  displayedColumns: string[] = [
    'categoryName',
    'words',
    'lastUpdated',
    'actions',
  ];
  categories: WordCategory[] = this.categoryService.getAllCategories();

  constructor(private categoryService: CategoryServiceModule) {}

  ngOnInit() {
    this.refreshCategories();
  }

  refreshCategories() {
    this.categories = this.categoryService.getAllCategories().sort((c1, c2) => {
      const nameCompare = c1.categoryName.localeCompare(c2.categoryName);

      if (nameCompare === 0) {
        const wordCompare = c2.words.length - c1.words.length;

        if (wordCompare === 0) {
          return c2.lastUpdated.getTime() - c1.lastUpdated.getTime();
        }

        return wordCompare;
      }

      return nameCompare;
    });
  }

  deleteCategory(categoryId: WordCategory['id']) {
    const shouldDelete = confirm(
      'Are you sure you want to delete this category?'
    );

    if (shouldDelete) {
      this.categoryService.deleteCategory(categoryId);

      this.refreshCategories();
    }
  }
}
