import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Readonly} from '@domain/aop';
import {Objects} from '@domain/utils';

export interface RemoveDialogData {
  element: any;
  actionOk: () => void;
  actionCancel?: () => void;
}

@Component({
  templateUrl: '../../views/dialogs/remove-dialog.html',
  styleUrls: ['../../styles/dialogs/remove-dialog.less'],
})
export class RemoveDialogComponent {
  constructor(private ref: MatDialogRef<RemoveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: RemoveDialogData) {
  }

  @Readonly
  public getDescription(): any {
    return this.data.element.description;
  }

  @Readonly
  public getType(): any {
    return this.data.element.type;
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
