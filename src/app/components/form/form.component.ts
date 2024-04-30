import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WordCategory } from '../../shared/model/Word-category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Language } from '../../shared/model/Language';
import { CategoryServiceModule } from '../../service/category-service/category-service.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatedWord } from '../../shared/model/Translated-word ';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  private categoryId: string | null = null;
  category: Partial<WordCategory> = {
    sourceLanguage: Language.English,
    targetLanguage: Language.Hebrew,
    words: [],
  };
  noWordsError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryServiceModule
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');

      if (this.categoryId) {
        this.loadCategory();
      }
    });
  }

  addWord() {
    this.category.words?.push(new TranslatedWord());
  }

  deleteWord(word: TranslatedWord) {
    this.category.words = this.category.words?.filter((w) => w !== word);
  }

  loadCategory() {
    if (this.categoryId) {
      const category = this.categoryService.getCategoryById(+this.categoryId);

      // Only if category exists
      if (category) {
        this.category = category;

        this.category.lastUpdated = new Date();
      }
    }
  }

  getLanguagePattern(languageType: 'source' | 'target' | Language) {
    const language =
      languageType in Language
        ? languageType
        : this.category[
            languageType === 'source' ? 'sourceLanguage' : 'targetLanguage'
          ];

    if (language === Language.Hebrew) {
      return '^[א-ת]*$';
    } else if (language === Language.English) {
      return '^[a-zA-Z]*$';
    }

    return '';
  }

  validateLanguage(
    word: TranslatedWord | string,
    languageType: 'source' | 'target' | Language = Language.English
  ) {
    const language =
      languageType in Language
        ? languageType
        : this.category[
            languageType === 'source' ? 'sourceLanguage' : 'targetLanguage'
          ];

    const wordString =
      typeof word === 'string'
        ? word
        : word[languageType === 'source' ? 'sourceWord' : 'targetWord'];

    let regex = new RegExp(this.getLanguagePattern(languageType));

    return regex.test(wordString);
  }

  saveCategory() {
    this.noWordsError = false;
    let errors = false;

    if (
      !this.category.categoryName ||
      !this.validateLanguage(this.category.categoryName)
    ) {
      errors = true;
    }

    const words = this.category.words || [];

    if (words.length <= 0) {
      errors = true;
      this.noWordsError = true;
    }

    for (const word of words) {
      if (
        !word.sourceWord ||
        !word.targetWord ||
        !this.validateLanguage(word, 'source') ||
        !this.validateLanguage(word, 'target')
      ) {
        errors = true;

        break;
      }
    }

    if (!errors) {
      if (
        this.categoryId &&
        this.categoryService.getCategoryById(+this.categoryId)
      ) {
        this.categoryService.updateCategory(this.category as WordCategory);
      } else {
        this.categoryService.addCategory(this.category as WordCategory);
      }

      this.router.navigate(['/']);
    }
  }
}
