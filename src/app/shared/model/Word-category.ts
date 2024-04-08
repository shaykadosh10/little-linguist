import { Language } from './Language';
import { TranslatedWord } from './Translated-word ';

export class WordCategory {
  public id: number;

  constructor(
    public categoryName: string,
    public lastUpdated: Date,
    public sourceLanguage: Language,
    public targetLanguage: Language,
    public words: TranslatedWord[]
  ) {
    this.id = 0;
  }
}
