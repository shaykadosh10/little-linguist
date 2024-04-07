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
  imports: [CategoryServiceModule, RouterLink, MatTableModule, MatIconModule],
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
  categories: WordCategory[] = [];

  constructor(private categoryService: CategoryServiceModule) {}

  ngOnInit() {
    this.refreshCategories();
  }

  refreshCategories() {
    this.categories = this.categoryService.getAllCategories();
  }

  deleteCategory(categoryId: WordCategory['id']) {
    this.categoryService.deleteCategory(categoryId);

    this.refreshCategories();
  }
}
