import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import 'rxjs/add/operator/filter';

import {Validate, Required, Readonly} from '@domain/aop';
import {Alert, AlertType} from '@domain/models';
import {AlertService} from '@domain/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceImpl extends AlertService {
  constructor() {
    super();

    this.delay$
      .pipe(delay(5000))
      .subscribe((alert) => {
        this.clear(alert);
      });
  }

  @Readonly
  public getAlert(alertId?: string): Observable<any> {
    return this.alerts$
      .asObservable()
      .filter((x: Alert) => x && x.alertId === alertId);
  }

  @Readonly
  @Validate
  public success(@Required message: string, alertId?: string) {
    const alert: Alert = new Alert({message: message, type: AlertType.Success, alertId: alertId});
    {
      this.alerts$.next(alert);
      this.delay$.next(alert);
    }
  }

  @Readonly
  @Validate
  public error(@Required message: string, alertId?: string) {
    const alert: Alert = new Alert({message: message, type: AlertType.Error, alertId: alertId});
    {
      this.alerts$.next(alert);
      this.delay$.next(alert);
    }
  }

  @Readonly
  @Validate
  public info(@Required message: string, alertId?: string) {
    const alert: Alert = new Alert({message: message, type: AlertType.Info, alertId: alertId});
    {
      this.alerts$.next(alert);
      this.delay$.next(alert);
    }
  }

  @Readonly
  @Validate
  public warn(@Required message: string, alertId?: string) {
    const alert: Alert = new Alert({message: message, type: AlertType.Warning, alertId: alertId});
    {
      this.alerts$.next(alert);
      this.delay$.next(alert);
    }
  }

  @Readonly
  @Validate
  public clear(@Required alert: Alert): void {
    {
      alert.setToRemove();
    }
    this.alerts$.next(alert);
  }
}
