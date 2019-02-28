import {Readonly, Required, Validate} from '@domain/aop';
import {IComponentLocks, ComponentLocks} from '@domain/models/сomponent.locks';
import {Objects} from '@domain/utils';
import {IGrantsService} from '@domain/services';

export interface IComponentDispatchers extends IComponentLocks {
  isDispatcherRunning(element: any): boolean;
  isDispatcherAborted(element: any): boolean;
  isDispatcherStopped(element: any): boolean;
  isDispatcherQueueEmpty(element: any): boolean;

  isDispatchersQueueEmpty(): boolean;
  isDispatchersRunning(): boolean;
  isDispatchersAborted(): boolean;
  isDispatchersStopped(): boolean;

  isAnyDispatchersQueueEmpty(): boolean;
  isAnyDispatchersRunning(): boolean;
  isAnyDispatchersAborted(): boolean;
  isAnyDispatchersStopped(): boolean;

  getDispatchers(): Array<any>;
  setDispatchers(response: any): void;

  getDispatcherById(id: any): any;

  isAllowDispatchersOperation(operation: string): boolean;
  isAllowOperation(operation: string): boolean;

  isDispatchersIdentical(): boolean;

  getGrantsService(): IGrantsService;
}

export abstract class ComponentDispatchers extends ComponentLocks implements IComponentDispatchers {
  private readonly RUNNING_STATE: string = 'running';
  private readonly ABORTED_STATE: string = 'aborted';
  private readonly STOPPED_STATE: string = 'stopped';

  public readonly START_DISPATCHERS: string = 'StartDispatchers';
  public readonly ABORT_DISPATCHERS: string = 'AbortDispatchers';
  public readonly RESET_DISPATCHERS: string = 'ResetDispatchers';
  public readonly STOP_DISPATCHERS: string = 'StopDispatchers';

  public readonly START_DISPATCHER: string = 'StartDispatcher';
  public readonly ABORT_DISPATCHER: string = 'AbortDispatcher';
  public readonly RESET_DISPATCHER: string = 'ResetDispatcher';
  public readonly STOP_DISPATCHER: string = 'StopDispatcher';

  public readonly ADD_DISPATCHER: string = 'AddDispatcher';
  public readonly REMOVE_DISPATCHER: string = 'RemoveDispatcher';

  public readonly SHUTDOWN_DISPATCHER: string = 'Shutdown';

  @Readonly
  @Validate
  public getDispatcherById(@Required id: any): any {
    const dispatchers: Array<any> = this.getDispatchers();

    return dispatchers.find(dispatcher => dispatcher.id === id);
  }

  @Readonly
  @Validate
  public isDispatcherRunning(@Required element: any): boolean {
    return element.state.dispatcher === this.RUNNING_STATE;
  }

  @Readonly
  @Validate
  public isDispatcherAborted(@Required element: any): boolean {
    return element.state.dispatcher === this.ABORTED_STATE;
  }

  @Readonly
  @Validate
  public isDispatcherStopped(@Required element: any): boolean {
    return element.state.dispatcher === this.STOPPED_STATE;
  }

  @Readonly
  @Validate
  public isDispatcherQueueEmpty(@Required element: any): boolean {
    return Number(element.queue.size) == 0;
  }

  @Readonly
  public isDispatchersQueueEmpty(): boolean {
    const dispatchers: Array<any> = this.getDispatchers();

    if (Objects.isUndefined(dispatchers) || Objects.isNull(dispatchers)) {
      return false;
    }

    if (!Array.isArray(dispatchers) || dispatchers.length === 0) {
      return false;
    }

    return dispatchers.every(item => {
      return this.isDispatcherQueueEmpty(item);
    });
  }

  @Readonly
  public isDispatchersRunning(): boolean {
    const dispatchers: Array<any> = this.getDispatchers();

    if (Objects.isUndefined(dispatchers) || Objects.isNull(dispatchers)) {
      return false;
    }

    if (!Array.isArray(dispatchers) || dispatchers.length === 0) {
      return false;
    }

    return dispatchers.every(item => {
      return this.isDispatcherRunning(item);
    });
  }

  @Readonly
  public isDispatchersAborted(): boolean {
    const dispatchers: Array<any> = this.getDispatchers();

    if (Objects.isUndefined(dispatchers) || Objects.isNull(dispatchers)) {
      return false;
    }

    if (!Array.isArray(dispatchers) || dispatchers.length === 0) {
      return false;
    }

    return dispatchers.every(item => {
      return this.isDispatcherAborted(item);
    });
  }

  @Readonly
  public isDispatchersStopped(): boolean {
    const dispatchers: Array<any> = this.getDispatchers();

    if (Objects.isUndefined(dispatchers) || Objects.isNull(dispatchers)) {
      return false;
    }

    if (!Array.isArray(dispatchers) || dispatchers.length === 0) {
      return false;
    }

    return dispatchers.every(item => {
      return this.isDispatcherStopped(item);
    });
  }

  @Readonly
  public isAnyDispatchersQueueEmpty(): boolean {
    const dispatchers: Array<any> = this.getDispatchers();

    if (Objects.isUndefined(dispatchers) || Objects.isNull(dispatchers)) {
      return false;
    }

    if (!Array.isArray(dispatchers) || dispatchers.length === 0) {
      return false;
    }

    return dispatchers.some(item => {
      return this.isDispatcherQueueEmpty(item);
    });
  }

  @Readonly
  public isAnyDispatchersRunning(): boolean {
    const dispatchers: Array<any> = this.getDispatchers();

    if (Objects.isUndefined(dispatchers) || Objects.isNull(dispatchers)) {
      return false;
    }

    if (!Array.isArray(dispatchers) || dispatchers.length === 0) {
      return false;
    }

    return dispatchers.some(item => {
      return this.isDispatcherRunning(item);
    });
  }

  @Readonly
  public isAnyDispatchersAborted(): boolean {
    const dispatchers: Array<any> = this.getDispatchers();

    if (Objects.isUndefined(dispatchers) || Objects.isNull(dispatchers)) {
      return false;
    }

    if (!Array.isArray(dispatchers) || dispatchers.length === 0) {
      return false;
    }

    return dispatchers.some(item => {
      return this.isDispatcherAborted(item);
    });
  }

  @Readonly
  public isAnyDispatchersStopped(): boolean {
    const dispatchers: Array<any> = this.getDispatchers();

    if (Objects.isUndefined(dispatchers) || Objects.isNull(dispatchers)) {
      return false;
    }

    if (!Array.isArray(dispatchers) || dispatchers.length === 0) {
      return false;
    }

    return dispatchers.some(item => {
      return this.isDispatcherStopped(item);
    });
  }

  @Readonly
  public isDispatchersIdentical(): boolean {
    return this.isDispatchersRunning() ||
      this.isDispatchersAborted() ||
      this.isDispatchersStopped();
  }

  @Readonly
  @Validate
  public isAllowDispatchersOperation(@Required operation: string): boolean {
    return this.isAllowOperation(this.START_DISPATCHERS) ||
      this.isAllowOperation(this.RESET_DISPATCHERS) ||
      this.isAllowOperation(this.ABORT_DISPATCHERS) ||
      this.isAllowOperation(this.STOP_DISPATCHERS);
  }

  @Readonly
  @Validate
  public isAllowOperation(@Required operation: string): boolean {
    const grantsService: IGrantsService = this.getGrantsService();
    return grantsService.isAllow(operation);
  }

  public abstract getDispatchers(): Array<any>;
  public abstract setDispatchers(response: any): void;

  public abstract getGrantsService(): IGrantsService;
}
