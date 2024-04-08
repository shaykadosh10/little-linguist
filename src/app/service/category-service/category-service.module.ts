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
        Language.Hebrew,
        Language.English,
        [
          new TranslatedWord('כלב', 'Dog'),
          new TranslatedWord('חתול', 'Cat'),
          new TranslatedWord('ציפור', 'Bird'),
        ]
      ),
      new WordCategory(
        'Colors',
        new Date(),
        Language.Hebrew,
        Language.English,
        [
          new TranslatedWord('אדום', 'Red'),
          new TranslatedWord('כחול', 'Blue'),
          new TranslatedWord('ירוק', 'Green'),
        ]
      ),
      new WordCategory(
        'Numbers',
        new Date(),
        Language.Hebrew,
        Language.English,
        [
          new TranslatedWord('אחד', 'One'),
          new TranslatedWord('שתיים', 'Two'),
          new TranslatedWord('שלוש', 'Three'),
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
