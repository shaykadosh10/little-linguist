import { Language } from "./Language";
import { TranslatedWord } from "./Translated-word ";

export class WordCategory {
  constructor(public categoryName: string, public id: number, public lastEditDate: Date,
    public sourceLanguage: Language, public targetLanguage: Language, public words: TranslatedWord[]) {}
}
