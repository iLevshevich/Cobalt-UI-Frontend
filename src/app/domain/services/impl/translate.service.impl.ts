import {Injectable, Inject, InjectionToken} from '@angular/core';

import {Validate, Required, Readonly} from '@domain/aop';
import {LANG_EN_NAME, LANG_EN_TRANS, LANG_RU_NAME, LANG_RU_TRANS} from '@domain/models';
import {TranslateService} from '@domain/services/translate.service';

export const TRANSLATIONS = new InjectionToken('translations');

export const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_RU_NAME]: LANG_RU_TRANS
};

export const TRANSLATION_PROVIDERS = [
  {provide: TRANSLATIONS, useValue: dictionary}
];

@Injectable({
  providedIn: 'root',
})
export class TranslateServiceImpl extends TranslateService {
  constructor(@Inject(TRANSLATIONS) private translations_: any) {
    super();
  }

  @Readonly
  public getCurrentLang() {
    return this.currentLang_;
  }

  @Readonly
  @Validate
  public setCurrentLang(@Required lang: string): void {
    this.currentLang_ = lang;
  }

  @Readonly
  @Validate
  public translate(@Required key: string): string {
    const translation = key;

    if (this.translations_[this.currentLang_] && this.translations_[this.currentLang_][key]) {
      return this.translations_[this.currentLang_][key];
    }

    return translation;
  }
}
