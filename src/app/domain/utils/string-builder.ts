'use strict';

import {Sealed, Readonly} from '@domain/aop';

@Sealed
export class StringBuilder {
  private strings: any;

  constructor() {
    this.strings = [];
  }

  @Readonly
  public append(value?: string): StringBuilder {
    if (value) {
      this.strings.push(value);
    }
    return this;
  }

  @Readonly
  public toString(separator: string = ''): string {
    return this.strings.join(separator);
  }
}
