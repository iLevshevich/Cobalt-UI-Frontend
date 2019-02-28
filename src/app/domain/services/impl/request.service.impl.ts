import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Validate, Required, Readonly} from '@domain/aop';
import {ApiService} from '@domain/services/api.service';
import {RequestService} from '@domain/services/request.service';
import {Objects} from '@domain/utils';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceImpl extends RequestService {
  constructor(private http_: HttpClient,
              private apiService_: ApiService) {
    super();
  }

  @Readonly
  @Validate
  public getGrants(@Required response: (value: HttpResponse<any>) => void,
                   @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.read.method,
      `${this.apiService_.read.url}${this.apiService_.getGrants}`,
      {
        responseType: this.apiService_.read.responseType,
        headers: {
          'Accept': this.apiService_.read.acceptType,
          'Content-Type': this.apiService_.read.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public getStatuses(@Required response: (value: HttpResponse<any>) => void,
                     @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.read.method,
      `${this.apiService_.read.url}${this.apiService_.getStatuses}`,
      {
        responseType: this.apiService_.read.responseType,
        headers: {
          'Accept': this.apiService_.read.acceptType,
          'Content-Type': this.apiService_.read.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public getTypes(@Required response: (value: HttpResponse<any>) => void,
                  @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.read.method,
      `${this.apiService_.read.url}${this.apiService_.getTypes}`,
      {
        responseType: this.apiService_.read.responseType,
        headers: {
          'Accept': this.apiService_.read.acceptType,
          'Content-Type': this.apiService_.read.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public cleanLastErrors(@Required response: (value: HttpResponse<any>) => void,
                         @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.cleanLastErrors}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public saveConfiguration(@Required response: (value: HttpResponse<any>) => void,
                           @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.saveConfiguration}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public startAll(@Required response: (value: HttpResponse<any>) => void,
                  @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.startAll}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public abortAll(@Required response: (value: HttpResponse<any>) => void,
                  @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.abortAll}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public resetAll(@Required response: (value: HttpResponse<any>) => void,
                  @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.resetAll}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public stopAll(@Required response: (value: HttpResponse<any>) => void,
                 @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.stopAll}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public addOne(@Required request: any,
                @Required response: (value: HttpResponse<any>) => void,
                @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.create.method,
      `${this.apiService_.create.url}${this.apiService_.addOne}`,
      {
        responseType: this.apiService_.create.responseType,
        headers: {
          'Accept': this.apiService_.create.acceptType,
          'Content-Type': this.apiService_.create.contentType
        },
        body: {
          __description: this.encode(request.description),
          __type: this.encode(request.type),
          __input_host: this.encode(request.inputHost),
          __input_port: this.encode(request.inputPort),
          __input_user: this.encode(request.inputUser),
          __input_password: this.encode(request.inputPassword),
          __input_vhost: this.encode(request.inputVhost),
          __input_prefetch: this.encode(request.inputPrefetch),
          __input_exchange: this.encode(request.inputExchange),
          __input_queue: this.encode(request.inputQueue),
          __input_routing_key: this.encode(request.inputRoutingKey),
          __output_host: this.encode(request.outputHost),
          __output_port: this.encode(request.outputPort),
          __output_user: this.encode(request.outputUser),
          __output_password: this.encode(request.outputPassword),
          __output_vhost: this.encode(request.outputVhost),
          __output_prefetch: this.encode(request.outputPrefetch),
          __output_exchange: this.encode(request.outputExchange),
          __output_queue: this.encode(request.outputQueue),
          __output_routing_key: this.encode(request.outputRoutingKey)
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public removeOne(@Required request: any,
                   @Required response: (value: HttpResponse<any>) => void,
                   @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.remove.method,
      `${this.apiService_.remove.url}${this.apiService_.removeOne}/${request.id}`,
      {
        responseType: this.apiService_.remove.responseType,
        headers: {
          'Accept': this.apiService_.remove.acceptType,
          'Content-Type': this.apiService_.remove.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public startOne(@Required request: any,
                  @Required response: (value: HttpResponse<any>) => void,
                  @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.startOne}/${request.id}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public abortOne(@Required request: any,
                  @Required response: (value: HttpResponse<any>) => void,
                  @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.abortOne}/${request.id}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public resetOne(@Required request: any,
                  @Required response: (value: HttpResponse<any>) => void,
                  @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.resetOne}/${request.id}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public stopOne(@Required request: any,
                 @Required response: (value: HttpResponse<any>) => void,
                 @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.update.method,
      `${this.apiService_.update.url}${this.apiService_.stopOne}/${request.id}`,
      {
        responseType: this.apiService_.update.responseType,
        headers: {
          'Accept': this.apiService_.update.acceptType,
          'Content-Type': this.apiService_.update.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  @Validate
  public shutdown(@Required response: (value: HttpResponse<any>) => void,
                  @Required error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void {
    this.http_.request(
      this.apiService_.management.method,
      `${this.apiService_.management.url}${this.apiService_.shutdown}`,
      {
        responseType: this.apiService_.read.responseType,
        headers: {
          'Accept': this.apiService_.read.acceptType,
          'Content-Type': this.apiService_.read.contentType
        }
      })
      .pipe(catchError(error))
      .subscribe(response);
  }

  @Readonly
  private encode(component: string): string {
    if (Objects.isUndefined(component) || Objects.isNull(component)) {
      return null;
    }

    return encodeURIComponent(component);
  }
}
