import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Validate, Required, Readonly} from '@domain/aop';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {
  @Readonly
  @Validate
  public intercept(@Required request: HttpRequest<any>,
                   @Required next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'If-Modified-Since': 'Mon, 26 Jul 1997 00:00:00 GMT'
      }
    });
    return next.handle(request);
  }
}
