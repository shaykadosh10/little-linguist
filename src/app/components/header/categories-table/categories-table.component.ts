import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { WordCategory } from '../../../shared/model/Word-category';
import { Language } from '../../../shared/model/Language';
import { TranslatedWord } from '../../../shared/model/Translated-word ';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
})
export class CategoriesTableComponent {
  displayedColumns: string[] = [
    'categoryName',
    'words',
    'lastEditDate',
    'actions',
  ];
  categories = [
    new WordCategory(
      'Animals',
      1,
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
      2,
      new Date (),
      Language.Hebrew,
      Language.English,
      [
        new TranslatedWord ('אדום','Red'),
        new TranslatedWord ('כחול','Blue'),
        new TranslatedWord ('ירוק','Green')
      ]
    ),
    new WordCategory(
      'Numbers',
      3,
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

}
