import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthInterceptor, AuthErrorInterceptor, AuthGuard, CacheInterceptor} from '@domain/helpers';
import {LoginComponent, EntryPointComponent, MainComponent} from '@domain/components';
import {AlertModule} from '@domain/modules/alert.module';
import {ScrollModule} from '@domain/modules/scroll.module';
import {TranslateModule} from '@domain/modules/translate.module';
import {LoginModule} from '@domain/modules/login.module';
import {PageHeaderModule} from '@domain/modules/page-header.module';
import {PageFooterModule} from '@domain/modules/page-footer.module';
import {MainModule} from '@domain/modules/main.module';
import {DecodeModule} from '@domain/modules/decode.module';

@NgModule({
  declarations: [
    EntryPointComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: EntryPointComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: ''}
    ], {preloadingStrategy: PreloadAllModules}),
    AlertModule,
    ScrollModule,
    TranslateModule,
    LoginModule,
    PageHeaderModule,
    PageFooterModule,
    DecodeModule,
    MainModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}
  ],
  bootstrap: [EntryPointComponent]
})
export class EntryPointModule {
}
