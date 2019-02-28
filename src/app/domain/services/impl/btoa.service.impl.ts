import {Injectable} from '@angular/core';

import {Validate, Required, Readonly} from '@domain/aop';
import {BtoaService} from '@domain/services/btoa.service';

@Injectable({
  providedIn: 'root'
})
export class BtoaServiceImpl extends BtoaService {
  private btoa: string;

  constructor() {
    super();

    this.btoa = '';
  }

  @Readonly
  @Validate
  public set(@Required btoa: string): void {
    this.btoa = btoa;
  }

  @Readonly
  public get(): string {
    return this.btoa;
  }

  @Readonly
  public isEmpty(): boolean {
    return this.btoa === '';
  }

  @Readonly
  public clean(): void {
    this.btoa = '';
  }
}
