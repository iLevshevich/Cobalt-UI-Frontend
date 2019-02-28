import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TRANSLATION_PROVIDERS, TranslateService, TranslateServiceImpl} from '@domain/services';
import {TranslatePipe, TranslateStatePipe} from '@domain/pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [TranslatePipe, TranslateStatePipe],
  exports: [TranslatePipe, TranslateStatePipe],
  providers: [
    TRANSLATION_PROVIDERS,
    {provide: TranslateService, useClass: TranslateServiceImpl}
  ]
})
export class TranslateModule {
}
