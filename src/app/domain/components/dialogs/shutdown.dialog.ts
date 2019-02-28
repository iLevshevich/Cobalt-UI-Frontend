import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Readonly} from '@domain/aop';
import {Objects} from '@domain/utils';

export interface ShutdownDialogData {
  actionOk: () => void;
  actionCancel?: () => void;
}

@Component({
  templateUrl: '../../views/dialogs/shutdown-dialog.html',
  styleUrls: ['../../styles/dialogs/shutdown-dialog.less'],
})
export class ShutdownDialogComponent {
  constructor(private ref: MatDialogRef<ShutdownDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: ShutdownDialogData) {
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
}
