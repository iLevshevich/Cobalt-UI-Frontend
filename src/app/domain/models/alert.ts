import {Validate, Required, Readonly} from '@domain/aop';

import {AlertType} from '@domain/models/alert.type';

export class Alert {
  public type: AlertType;
  public message: string;
  public alertId: string;
  public messageId: string;
  private toRemove: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
    {
      this.toRemove = false;
      this.messageId = this.uuid();
    }
  }

  @Readonly
  public setToRemove(): void {
    this.toRemove = true;
  }

  @Readonly
  public isToRemove(): boolean {
    return !!this.toRemove;
  }

  @Readonly
  private uuid(): string {
    return this._p8() + this._p8(true) + this._p8(true) + this._p8();
  }

  @Readonly
  @Validate
  private _p8(@Required s: boolean = false): string {
    const p: string = (Math.random().toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
  }
}
