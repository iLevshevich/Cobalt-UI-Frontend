import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '@domain/modules/material.module';
import {TranslateModule} from '@domain/modules/translate.module';
import {PerformanceModule} from '@domain/modules/performance.module';
import {TypeModule} from '@domain/modules/type.module';
import {StatusErrorInterceptor} from '@domain/helpers';
import {
  MainComponent,
  ShutdownDialogComponent,
  DetailsDialogComponent,
  RemoveDialogComponent,
  AddDialogComponent
} from '@domain/components';
import {
  RequestService, RequestServiceImpl,
  AlertService, AlertServiceImpl
} from '@domain/services';
import {WindowReference} from '@domain/utils';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    TranslateModule,
    PerformanceModule,
    TypeModule,
    MaterialModule
  ],
  entryComponents: [
    ShutdownDialogComponent,
    DetailsDialogComponent,
    RemoveDialogComponent,
    AddDialogComponent
  ],
  declarations: [
    ShutdownDialogComponent,
    DetailsDialogComponent,
    RemoveDialogComponent,
    AddDialogComponent,
    MainComponent
  ],
  exports: [
    MainComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: StatusErrorInterceptor, multi: true},
    {provide: RequestService, useClass: RequestServiceImpl},
    {provide: AlertService, useClass: AlertServiceImpl},
    WindowReference
  ],
})
export class MainModule {
}
