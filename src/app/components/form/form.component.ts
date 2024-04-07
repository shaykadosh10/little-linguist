import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WordCategory } from '../../shared/model/Word-category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Language } from '../../shared/model/Language';
import { CategoryServiceModule } from '../../service/category-service/category-service.module';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CategoryServiceModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  private categoryId: string | null = null;
  category: Partial<WordCategory> = {
    sourceLanguage: Language.English,
    targetLanguage: Language.Hebrew,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryServiceModule
  ) {
    console.log(this.fb);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');

      if (this.categoryId) {
        this.loadCategory();
      }
    });
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
