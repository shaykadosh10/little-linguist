import { RouterModule, Routes, provideRouter } from '@angular/router';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { FormComponent } from './components/form/form.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: CategoriesTableComponent },
  { path: 'forms', component: FormComponent },
  { path: 'forms/:id', component: FormComponent },
];
