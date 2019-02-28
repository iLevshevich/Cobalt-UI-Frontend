import {Injector, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Validate, Required, Readonly} from '@domain/aop';
import {Objects} from '@domain/utils';
import {
  IAlertService, AlertService,
  IErrorDecodeService, ErrorDecodeService
} from '@domain/services';

@Injectable({
  providedIn: 'root'
})
export class StatusErrorInterceptor implements HttpInterceptor {
  constructor(private injector_: Injector) {
  }

  @Readonly
  @Validate
  public intercept(@Required request: HttpRequest<any>,
                   @Required next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(map(event => {
        if (event instanceof HttpResponse) {
          if (Objects.isDefined(event.body) || Objects.isNonNull(event.body)) {
            if (!this.isSuccess(event.body.status)) {
              const decodeService: IErrorDecodeService = this.getDecodeService();
              const error: { code: number, message: string } = decodeService.decode(event.body.code, event.body.reason, decodeService.getTemplate(request.method));

              const alertService: IAlertService = this.getAlertService();
              {
                alertService.error(error.message);
              }
              console.error(error.message);
            }
          }
        }
        return event;
      }));
  }

  @Readonly
  @Validate
  private isSuccess(@Required value: string): boolean {
    return value === 'SUCCESS';
  }

  @Readonly
  private getDecodeService(): IErrorDecodeService {
    const service: IErrorDecodeService = this.injector_.get(ErrorDecodeService);
    if (Objects.isUndefined(service) || Objects.isNull(service)) {
      throw new Error('StatusErrorInterceptor::getDecodeService(): Invalid decode service');
    }
    return service;
  }

  @Readonly
  private getAlertService(): IAlertService {
    const service: IAlertService = this.injector_.get(AlertService);
    if (Objects.isUndefined(service) || Objects.isNull(service)) {
      throw new Error('StatusErrorInterceptor::getAlertService(): Invalid alert service');
    }
    return service;
  }
}
