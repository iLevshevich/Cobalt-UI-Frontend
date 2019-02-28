import {Injector, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Validate, Required, Readonly} from '@domain/aop';
import {Objects} from '@domain/utils';
import {IBtoaService, BtoaService} from '@domain/services';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector_: Injector) {
  }

  @Readonly
  @Validate
  public intercept(@Required request: HttpRequest<any>,
                   @Required next: HttpHandler): Observable<HttpEvent<any>> {
    const service: IBtoaService = this.getService();
    if (!service.isEmpty()) {
      const btoa: string = service.get();
      if (Objects.isDefined(btoa) && Objects.isNonNull(btoa)) {
        request = request.clone({
          setHeaders: {
            Authorization: `Basic ${btoa}`
          }
        });
      }
    }

    return next.handle(request);
  }

  @Readonly
  private getService(): IBtoaService {
    const service: IBtoaService = this.injector_.get(BtoaService);
    if (Objects.isUndefined(service) || Objects.isNull(service)) {
      throw new Error('AuthInterceptor::getService(): Invalid btoa service');
    }
    return service;
  }
}
