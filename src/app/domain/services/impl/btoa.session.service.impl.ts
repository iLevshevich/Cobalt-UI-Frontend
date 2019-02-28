import {Injectable} from '@angular/core';

import {Validate, Required, Readonly} from '@domain/aop';
import {BtoaService} from '@domain/services/btoa.service';
import {Objects} from '@domain/utils';

@Injectable({
  providedIn: 'root'
})
export class BtoaSessionServiceImpl extends BtoaService {
  private readonly key: string = '__btoa';

  constructor() {
    super();
  }

  @Readonly
  @Validate
  public set(@Required btoa: string): void {
    sessionStorage.setItem(this.key, btoa);
  }

  @Readonly
  public get(): string {
    return sessionStorage.getItem(this.key);
  }

  @Readonly
  public isEmpty(): boolean {
    const value: string = sessionStorage.getItem(this.key);
    return Objects.isUndefined(value) || Objects.isNull(value);
  }

  @Readonly
  public clean(): void {
    sessionStorage.removeItem(this.key);
  }
}
