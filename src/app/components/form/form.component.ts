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

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
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
    console.log('add word');
    this.category.words?.push(new TranslatedWord());
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

  saveCategory() {
    console.log('Category saved:', this.category);

    // Validation

    if (this.categoryId) {
      if (this.categoryService.getCategoryById(+this.categoryId)) {
        this.categoryService.updateCategory(this.category as WordCategory);
      } else {
        this.categoryService.addCategory(this.category as WordCategory);
      }

      this.router.navigate(['/']);
    }
  }
}
