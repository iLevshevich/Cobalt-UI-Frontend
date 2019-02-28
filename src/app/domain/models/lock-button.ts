import {Sealed, Readonly} from '@domain/aop';

export interface ILockButton {
  isLock(): boolean;
  Lock(): void;
  Unlock(): void;
}

@Sealed
export class LockButton implements ILockButton {
  private lockButton: boolean;

  constructor() {
    this.lockButton = false;
  }

  @Readonly
  public isLock(): boolean {
    return !!this.lockButton;
  }

  @Readonly
  public Lock(): void {
    this.lockButton = true;
  }

  @Readonly
  public Unlock(): void {
    this.lockButton = false;
  }
}
