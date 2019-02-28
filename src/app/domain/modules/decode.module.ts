import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ErrorDecodeService, ErrorDecodeServiceImpl} from '@domain/services';

@NgModule({
  imports: [CommonModule],
  providers: [
    {provide: ErrorDecodeService, useClass: ErrorDecodeServiceImpl}
  ]
})
export class DecodeModule {
}
