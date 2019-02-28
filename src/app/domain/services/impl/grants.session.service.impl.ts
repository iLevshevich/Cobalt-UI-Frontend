import {Injectable} from '@angular/core';

import {Validate, Required, Readonly} from '@domain/aop';
import {GrantsService} from '@domain/services/grants.service';
import {Objects} from '@domain/utils';

@Injectable({
  providedIn: 'root'
})
export class GrantsSessionServiceImpl extends GrantsService {
  private readonly key: string = '__grants';

  constructor() {
    super();
  }

  @Readonly
  @Validate
  public copy(@Required source: any): void {
    sessionStorage.setItem(this.key, JSON.stringify(source.grants));
  }

  @Readonly
  @Validate
  public isAllow(@Required key: string): boolean {
    const json: any = JSON.parse(sessionStorage.getItem(this.key));
    const grants: Array<string> = Array.from<string>(json);
    return Objects.isDefined(grants.find(grant => grant === key));
  }
}
