import {Observable} from 'rxjs';
import {throwError} from 'rxjs/index';
import {HttpErrorResponse} from '@angular/common/http';

import {Required, Validate} from '@domain/aop';
import {IErrorDecodeService, IAlertService} from '@domain/services';

export interface IHandlers {
  getDecodeService(): IErrorDecodeService;
  getAlertService(): IAlertService;
  defaultErrorHandler(err: HttpErrorResponse | any,
                      method: string | 'GET' | 'POST' | 'PUT' | 'DELETE'): Observable<any>;
}

export abstract class Handlers implements IHandlers {
  public abstract getDecodeService(): IErrorDecodeService;

  public abstract getAlertService(): IAlertService;

  @Validate
  public defaultErrorHandler(@Required err: HttpErrorResponse | any,
                             @Required method: string | 'GET' | 'POST' | 'PUT' | 'DELETE'): Observable<any> {
    const decodeService: IErrorDecodeService = this.getDecodeService();
    const alertService: IAlertService = this.getAlertService();

    const error: { code: number, message: string } =
      decodeService.decode(err.status, err.error.message || err.error, decodeService.getTemplate(method));
    {
      alertService.error(error.message);
    }
    console.error(error.message);
    return throwError(error.message);
  }
}
