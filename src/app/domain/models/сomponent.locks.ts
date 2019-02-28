import {Readonly, Required, Validate} from '@domain/aop';
import {IOperations, Operations} from '@domain/models/operations';
import {LockButton} from '@domain/models/lock-button';

export interface IComponentLocks extends IOperations {
  isLock(id: string,
         action: string): boolean;
  Lock(id: string,
       action: string): void;
  Unlock(id: string,
         action: string): void;
}

export abstract class ComponentLocks extends Operations implements IComponentLocks {
  protected idLocks: Map<string, LockButton> = new Map<string, LockButton>();

  @Readonly
  @Validate
  public isLock(@Required guid: string,
                @Required action: string): boolean {
    const id: string = guid + action;
    if (!this.idLocks.has(id)) {
      this.idLocks.set(id, new LockButton());
    }
    return this.idLocks.get(id).isLock();
  }

  @Readonly
  @Validate
  public Lock(@Required guid: string,
              @Required action: string): void {
    const id: string = guid + action;
    if (!this.idLocks.has(id)) {
      this.idLocks.set(id, new LockButton());
    }
    this.idLocks.get(id).Lock();
  }

  @Readonly
  @Validate
  public Unlock(@Required guid: string,
                @Required action: string): void {
    const id: string = guid + action;
    if (!this.idLocks.has(id)) {
      this.idLocks.set(id, new LockButton());
    }
    this.idLocks.get(id).Unlock();
  }
}
