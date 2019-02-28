import {Injectable} from '@angular/core';

import {Validate, Required, Readonly} from '@domain/aop';
import {GrantsService} from '@domain/services/grants.service';
import {Objects} from '@domain/utils';

@Injectable({
  providedIn: 'root'
})
export class GrantsServiceImpl extends GrantsService {
  protected grants: Array<string> = [];

  constructor() {
    super();
  }

  @Readonly
  @Validate
  public copy(@Required source: any): void {
    this.grants = Array.from<string>(source.grants);
  }

  @Readonly
  @Validate
  public isAllow(@Required key: string): boolean {
    return Objects.isDefined(this.grants.find(grant => grant === key));
  }
}
