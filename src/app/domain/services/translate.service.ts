export interface ITranslateService {
  getCurrentLang(): string;
  setCurrentLang(lang: string): void;
  translate(key: string);
}

export abstract class TranslateService implements ITranslateService {
  protected currentLang_: string;

  constructor() {
    this.currentLang_ = '';
  }

  abstract getCurrentLang(): string;
  abstract setCurrentLang(lang: string): void;
  abstract translate(key: string);
}
