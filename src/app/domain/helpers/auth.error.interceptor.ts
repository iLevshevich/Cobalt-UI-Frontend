import {Injector, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Validate, Required, Readonly} from '@domain/aop';
import {Objects} from '@domain/utils';
import {
  IAuthService, AuthService,
} from '@domain/services';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorInterceptor implements HttpInterceptor {
  private readonly authenticateStatusCode: number = 401;

  constructor(private injector_: Injector) {
  }

  @Readonly
  @Validate
  public intercept(@Required request: HttpRequest<any>,
                   @Required next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError(err => {
        if (err.status === this.authenticateStatusCode) {
          const authService: IAuthService = this.getAuthService();
          {
            authService.logout();
          }
        }
        return throwError(err);
      }));
  }

  @Readonly
  private getAuthService(): IAuthService {
    const service: IAuthService = this.injector_.get(AuthService);
    if (Objects.isUndefined(service) || Objects.isNull(service)) {
      throw new Error('AuthErrorInterceptor::getAuthService(): Invalid auth service');
    }
    return service;
  }
}
