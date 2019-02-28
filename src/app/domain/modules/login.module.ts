import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';

import {TranslateModule} from '@domain/modules/translate.module';
import {LoginComponent} from '@domain/components';
import {
  GrantsService, GrantsSessionServiceImpl,  GrantsServiceImpl,
  BtoaService, BtoaSessionServiceImpl, BtoaServiceImpl,
  AuthService, AuthServiceImpl,
  RequestService, RequestServiceImpl,
  AlertService, AlertServiceImpl
} from '@domain/services';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    {provide: GrantsService, useClass: GrantsServiceImpl},
    {provide: BtoaService, useClass: BtoaServiceImpl},
    {provide: AuthService, useClass: AuthServiceImpl},
    {provide: RequestService, useClass: RequestServiceImpl},
    {provide: AlertService, useClass: AlertServiceImpl}
  ]
})
export class LoginModule {
}
