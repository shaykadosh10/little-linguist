import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordCategory } from '../../shared/model/Word-category';
import { Language } from '../../shared/model/Language';
import { TranslatedWord } from '../../shared/model/Translated-word ';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceModule {
  private categoryMap = new Map<WordCategory['id'], WordCategory>();
  private currentCategoryId = 1;

  constructor() {
    const categories = [
      new WordCategory(
        'Animals',
        new Date(),
        Language.English,
        Language.Hebrew,
        [
          new TranslatedWord('Dog', 'כלב'),
          new TranslatedWord('Cat', 'חתול'),
          new TranslatedWord('Bird', 'ציפור'),
        ]
      ),
      new WordCategory(
        'Colors',
        new Date(),
        Language.English,
        Language.Hebrew,
        [
          new TranslatedWord('Red', 'אדום'),
          new TranslatedWord('Blue', 'כחול'),
          new TranslatedWord('Green', 'ירוק'),
        ]
      ),
      new WordCategory(
        'Numbers',
        new Date(),
        Language.English,
        Language.Hebrew,
        [
          new TranslatedWord('One', 'אחד'),
          new TranslatedWord('Two', 'שתיים'),
          new TranslatedWord('Three', 'שלוש'),
        ]
      ),
    ];

    for (const category of categories) {
      this.addCategory(category);
    }
  }

  addCategory(category: WordCategory) {
    category.id = this.currentCategoryId++;

    this.updateCategory(category);
  }

  updateCategory(category: WordCategory) {
    console.log('old date', category.lastUpdated);
    category.lastUpdated = new Date();
    console.log('new date', category.lastUpdated);

    console.log('update', category.lastUpdated);
    this.categoryMap.set(category.id, category);
  }

  getCategoryById(categoryId: WordCategory['id']): WordCategory | null {
    return this.categoryMap.get(categoryId) || null;
  }

  getAllCategories(): WordCategory[] {
    return [...this.categoryMap.values()];
  }

  deleteCategory(categoryId: WordCategory['id']) {
    this.categoryMap.delete(categoryId);
  }
}
