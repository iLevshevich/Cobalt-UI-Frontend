import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@domain/modules/translate.module';
import {PageHeaderComponent} from '@domain/components';
import {CookieServiceService, CookieServiceImpl} from '@domain/services';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
  providers: [
    {provide: CookieServiceService, useClass: CookieServiceImpl}
  ]
})
export class PageHeaderModule {
}
