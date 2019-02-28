import {Subject, Observable} from 'rxjs';

import {Alert} from '@domain/models';

export interface IAlertService {
  getAlert(alertId?: string): Observable<any>;
  success(message: string, alertId?: string): void;
  error(message: string, alertId?: string): void;
  info(message: string, alertId?: string): void;
  warn(message: string, alertId?: string): void;
  clear(alert: Alert): void;
}

export abstract class AlertService implements IAlertService {
  protected alerts$: Subject<Alert>;
  protected delay$: Subject<Alert>;

  constructor() {
    this.alerts$ = new Subject<Alert>();
    this.delay$ = new Subject<Alert>();
  }

  abstract getAlert(alertId?: string): Observable<any>;
  abstract success(message: string, alertId?: string): void;
  abstract error(message: string, alertId?: string): void;
  abstract info(message: string, alertId?: string): void;
  abstract warn(message: string, alertId?: string): void;
  abstract clear(alert: Alert): void;
}
