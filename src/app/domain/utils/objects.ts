'use strict';

import {Sealed, Validate, Required, Readonly} from '@domain/aop';

@Sealed
export class Objects {
  @Readonly
  @Validate
  public static isUndefined(@Required value: any): boolean {
    return typeof value === 'undefined';
  }

  @Readonly
  @Validate
  public static isDefined(@Required value: any): boolean {
    return typeof value !== 'undefined';
  }

  @Readonly
  @Validate
  public static isNull(@Required value: any): boolean {
    return value === null;
  }

  @Readonly
  @Validate
  public static isNonNull(@Required value: any): boolean {
    return value !== null;
  }
}
