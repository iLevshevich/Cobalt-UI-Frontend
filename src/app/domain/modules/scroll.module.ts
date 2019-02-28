import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

import {ScrollComponent} from '@domain/components';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [ScrollComponent],
  exports: [ScrollComponent]
})
export class ScrollModule {
}
