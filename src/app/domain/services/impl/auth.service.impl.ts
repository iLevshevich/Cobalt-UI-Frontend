import {Inject, Injectable} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Validate, Required, Readonly} from '@domain/aop';
import {IRequestService, RequestService} from '@domain/services/request.service';
import {IBtoaService, BtoaService} from '@domain/services/btoa.service';
import {AuthService} from '@domain/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceImpl extends AuthService {
  constructor(@Inject(RequestService) private requestService_: IRequestService,
              @Inject(BtoaService) private btoaService_: IBtoaService) {
    super();
  }

  @Readonly
  @Validate
  public login(@Required username: string,
               @Required password: string,
               @Required response: (value: HttpResponse<any>) => void,
               @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    {
      this.btoaService_.set(window.btoa(`${username}:${password}`));
    }
    this.requestService_.getGrants(response, error);
  }

  @Readonly
  public logout(): void {
    this.btoaService_.clean();
  }
}

