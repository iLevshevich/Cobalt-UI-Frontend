import {Inject, Component, OnInit} from '@angular/core';

import {Validate, Required, Readonly} from '@domain/aop';
import {
  ITranslateService, TranslateService,
  ICookieServiceService, CookieServiceService
} from '@domain/services';

@Component({
  selector: 'page-header-outlet',
  templateUrl: '../views/page-header.html',
  styleUrls: ['../styles/page-header.less']
})
export class PageHeaderComponent implements OnInit {
  private readonly cookieLangName: string;
  private readonly cookieLangPath: string;
  private readonly cookieLangExpires: number;
  private readonly defaultLangValue: string;
  public supportedLangs: any[];

  constructor(@Inject(TranslateService) private _translate: ITranslateService,
              @Inject(CookieServiceService) private _cookie: ICookieServiceService) {
    this.supportedLangs = [
      {display: 'English', value: 'en'},
      {display: 'Русский', value: 'ru'}
    ];

    this.cookieLangName = '__lang';
    this.cookieLangPath = '/';
    this.defaultLangValue = 'en';
    this.cookieLangExpires = 365;
  }

  public ngOnInit() {
    const cookie: string = this._cookie.getCookie(this.cookieLangName);
    if (this.isCookieEmpty(cookie)) {
      this.setLang(this.defaultLangValue);
    } else {
      this.setLang(cookie);
    }
  }

  @Readonly
  @Validate
  public isLangEquals(@Required lang: string): boolean {
    return lang === this._translate.getCurrentLang();
  }

  @Readonly
  @Validate
  public setLang(@Required lang: string): void {
    this._translate.setCurrentLang(lang);
  }

  @Readonly
  @Validate
  public setCookie(@Required lang: string): void {
    this._cookie.setCookie(this.cookieLangName, lang, {expires: this.cookieLangExpires, path: this.cookieLangPath});
  }

  @Readonly
  private isCookieEmpty(cookie?: string): boolean {
    const isUndefined: boolean = ('undefined' === cookie);
    const isEmpty: boolean = (0 === cookie.length);
    return (isUndefined || isEmpty);
  }
}
