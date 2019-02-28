import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TypePipe} from '@domain/pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [TypePipe],
  exports: [TypePipe]
})
export class TypeModule {
}
