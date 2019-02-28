import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface IRequestService {
  getGrants(response: (value: HttpResponse<any>) => void,
            error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  getStatuses(response: (value: HttpResponse<any>) => void,
              error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  getTypes(response: (value: HttpResponse<any>) => void,
           error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  cleanLastErrors(response: (value: HttpResponse<any>) => void,
                  error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  saveConfiguration(response: (value: HttpResponse<any>) => void,
                    error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  startAll(response: (value: HttpResponse<any>) => void,
           error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abortAll(response: (value: HttpResponse<any>) => void,
           error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  resetAll(response: (value: HttpResponse<any>) => void,
           error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  stopAll(response: (value: HttpResponse<any>) => void,
          error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  addOne(request: any,
         response: (value: HttpResponse<any>) => void,
         error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  removeOne(request: any,
            response: (value: HttpResponse<any>) => void,
            error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  startOne(request: any,
           response: (value: HttpResponse<any>) => void,
           error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abortOne(request: any,
           response: (value: HttpResponse<any>) => void,
           error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  resetOne(request: any,
           response: (value: HttpResponse<any>) => void,
           error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  stopOne(request: any,
          response: (value: HttpResponse<any>) => void,
          error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  shutdown(response: (value: HttpResponse<any>) => void,
           error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;
}

export abstract class RequestService implements IRequestService {
  abstract getGrants(response: (value: HttpResponse<any>) => void,
                     error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract getStatuses(response: (value: HttpResponse<any>) => void,
                       error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract getTypes(response: (value: HttpResponse<any>) => void,
                    error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract cleanLastErrors(response: (value: HttpResponse<any>) => void,
                           error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract saveConfiguration(response: (value: HttpResponse<any>) => void,
                             error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract startAll(response: (value: HttpResponse<any>) => void,
                    error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract abortAll(response: (value: HttpResponse<any>) => void,
                    error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract resetAll(response: (value: HttpResponse<any>) => void,
                    error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract stopAll(response: (value: HttpResponse<any>) => void,
                   error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract addOne(request: any,
                  response: (value: HttpResponse<any>) => void,
                  error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract removeOne(request: any,
                     response: (value: HttpResponse<any>) => void,
                     error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract startOne(request: any,
                    response: (value: HttpResponse<any>) => void,
                    error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract abortOne(request: any,
                    response: (value: HttpResponse<any>) => void,
                    error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract resetOne(request: any,
                    response: (value: HttpResponse<any>) => void,
                    error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract stopOne(request: any,
                   response: (value: HttpResponse<any>) => void,
                   error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract shutdown(response: (value: HttpResponse<any>) => void,
                    error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;
}
