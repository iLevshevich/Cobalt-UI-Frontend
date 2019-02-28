import {Component, OnInit, Input, Inject} from '@angular/core';

import {Validate, Required, Readonly} from '@domain/aop';
import {Alert, AlertType} from '@domain/models';
import {IAlertService, AlertService} from '@domain/services';
import {Objects} from '@domain/utils';

@Component({
  selector: 'alert-outlet',
  templateUrl: '../views/alert.html',
  styleUrls: ['../styles/alert.less']
})
export class AlertComponent implements OnInit {
  @Input() id: string;
  alerts: Alert[];

  constructor(@Inject(AlertService) private alertService_: IAlertService) {
    this.alerts = [];
  }

  public ngOnInit(): void {
    this.alertService_
      .getAlert(this.id)
      .subscribe((alert: Alert) => {
        if (Objects.isDefined(alert) && alert.isToRemove()) {
          {
            this.removeAlert(alert);
          }
          return;
        }

        this.addAlert(alert);
      });
  }

  @Readonly
  @Validate
  public addAlert(@Required alert: Alert): void {
    this.alerts.push(alert);
  }

  @Readonly
  @Validate
  public removeAlert(@Required alert: Alert): void {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  @Readonly
  @Validate
  public getCssClass(@Required alert: Alert): string {
    if (Objects.isUndefined(alert) || Objects.isNull(alert)) {
      return;
    }
    return AlertType.getCssClass(alert.type);
  }

  @Readonly
  @Validate
  public getIconClass(@Required alert: Alert): string {
    if (Objects.isUndefined(alert) || Objects.isNull(alert)) {
      return;
    }
    return AlertType.getIconClass(alert.type);
  }

  @Readonly
  @Validate
  public getMessageType(@Required alert: Alert): string {
    if (Objects.isUndefined(alert) || Objects.isNull(alert)) {
      return;
    }
    return AlertType.getMessageType(alert.type);
  }
}
