import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AlertService, AlertServiceImpl} from '@domain/services';
import {AlertComponent} from '@domain/components';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  providers: [
    {provide: AlertService, useClass: AlertServiceImpl}
  ]
})
export class AlertModule {
}
