import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@domain/modules/translate.module';
import {PageFooterComponent} from '@domain/components';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [PageFooterComponent],
  exports: [PageFooterComponent]
})
export class PageFooterModule {
}
