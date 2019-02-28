import {Pipe, PipeTransform} from '@angular/core';

import {Readonly, Required, Validate} from '@domain/aop';
import {Objects} from '@domain/utils';

@Pipe({
  name: 'performance',
  pure: false
})
export class PerformancePipe implements PipeTransform {
  private readonly MICROSECONDS_TYPE: string = 'microseconds';
  private readonly MILLISECONDS_TYPE: string = 'milliseconds';
  private readonly SECONDS_TYPE: string = 'seconds';

  @Readonly
  @Validate
  public transform(@Required value: number,
                   @Required type: string): any {
    if (Objects.isUndefined(value) || Objects.isNull(value)) {
      return;
    }

    if (this.isMicroSeconds(type)) {
      return ((Number(value / 1000000)).toFixed(4)).toString();
    }

    if (this.isMilliSeconds(type)) {
      return ((Number(value / 1000)).toFixed(4)).toString();
    }

    if (this.isSeconds(type)) {
      return ((Number(value)).toFixed(4)).toString();
    }
  }

  @Readonly
  @Validate
  private isMicroSeconds(@Required type: string): boolean {
    return type === this.MICROSECONDS_TYPE;
  }

  @Readonly
  @Validate
  private isMilliSeconds(@Required type: string): boolean {
    return type === this.MILLISECONDS_TYPE;
  }

  @Readonly
  @Validate
  private isSeconds(@Required type: string): boolean {
    return type === this.SECONDS_TYPE;
  }
}
