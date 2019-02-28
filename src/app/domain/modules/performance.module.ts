import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PerformancePipe} from '@domain/pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [PerformancePipe],
  exports: [PerformancePipe]
})
export class PerformanceModule {
}
