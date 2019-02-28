import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Readonly} from '@domain/aop';
import {Objects} from '@domain/utils';
import {DispatchersType} from '@domain/models';

export interface DetailsDialogData {
  element: any;
  actionOk?: () => void;
  actionCancel?: () => void;
}

@Component({
  templateUrl: '../../views/dialogs/details-dialog.html',
  styleUrls: ['../../styles/dialogs/details-dialog.less'],
})
export class DetailsDialogComponent {
  constructor(private ref: MatDialogRef<DetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: DetailsDialogData) {
  }

  @Readonly
  public getElement(): any {
    return this.data.element;
  }

  @Readonly
  public onOk(): void {
    if (Objects.isDefined(this.data.actionOk) && Objects.isNonNull(this.data.actionOk)) {
      this.data.actionOk();
    }
    this.ref.close();
  }

  @Readonly
  public onCancel(): void {
    if (Objects.isDefined(this.data.actionCancel) && Objects.isNonNull(this.data.actionCancel)) {
      this.data.actionCancel();
    }
    this.ref.close();
  }

  @Readonly
  public isInputAmqpType(): boolean {
    return DispatchersType.isInputAmqpType(this.data.element.type) === true;
  }

  @Readonly
  public isOutputAmqpType(): boolean {
    return DispatchersType.isOutputAmqpType(this.data.element.type) === true;
  }
}
