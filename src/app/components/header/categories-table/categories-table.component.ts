import { Component } from '@angular/core';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css'
})
export class CategoriesTableComponent {
 categories = [
  { 
   name: 'color',
   words:'green, red, blue'
  },
  {
   name: 'animals',
   words:'dog, cat, dolphin'
  },
  {
   name: 'numbers',
   words:'one, two, three'
  }
 ];
}
