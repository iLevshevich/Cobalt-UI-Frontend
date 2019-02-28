import {Readonly, Required, Validate} from '@domain/aop';
import {IComponentDispatchers, ComponentDispatchers} from '@domain/models/сomponent.dispatchers';
import {ApiService, IRequestService} from '@domain/services';

export interface IComponentOperations extends IComponentDispatchers {
  getRequestService(): IRequestService;
  getApiService(): ApiService;

  getDispatcherTypes(): Array<string>;
  setDispatcherTypes(response: any): void;

  getStatuses(): void;
  getTypes(): void;

  cleanLastErrors(): void;
  saveConfiguration(): void;

  startAll(): void;
  abortAll(): void;
  resetAll(): void;
  stopAll(): void;

  addOne(object: any): void;
  removeOne(id: string): void;

  startOne(id: string): void;
  abortOne(id: string): void;
  resetOne(id: string): void;
  stopOne(id: string): void;

  refresh(): void;
  shutdown(): void;
}

export abstract class ComponentOperations extends ComponentDispatchers implements IComponentOperations {
  public readonly GLOBAL_ID: string = 'GLOBAL';

  public readonly CLEAN_LAST_ERRORS_OPERATION: string = 'CLEAN_LAST_ERRORS';
  public readonly SAVE_CONFIGURATION_OPERATION: string = 'SAVE_CONFIGURATION';

  public readonly START_ALL_OPERATION: string = 'START_ALL';
  public readonly ABORT_ALL_OPERATION: string = 'ABORT_ALL';
  public readonly RESET_ALL_OPERATION: string = 'RESET_ALL';
  public readonly STOP_ALL_OPERATION: string = 'STOP_ALL';

  public readonly ADD_ONE_OPERATION: string = 'ADD_ONE';
  public readonly REMOVE_ONE_OPERATION: string = 'REMOVE_ONE';

  public readonly START_ONE_OPERATION: string = 'START_ONE';
  public readonly ABORT_ONE_OPERATION: string = 'ABORT_ONE';
  public readonly RESET_ONE_OPERATION: string = 'RESET_ONE';
  public readonly STOP_ONE_OPERATION: string = 'STOP_ONE';

  public readonly REFRESH_OPERATION: string = 'REFRESH';
  public readonly SHUTDOWN_OPERATION: string = 'SHUTDOWN';

  public abstract getRequestService(): IRequestService;
  public abstract getApiService(): ApiService;
  public abstract getDispatcherTypes(): Array<string>;
  public abstract setDispatcherTypes(response: any): void;

  @Readonly
  public refresh(): void {
    this.Lock(this.GLOBAL_ID, this.REFRESH_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.getStatuses(
      (value) => {
        this.guard(() => {
            this.setDispatchers(value);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.REFRESH_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.read.method);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.REFRESH_OPERATION);
          });
      });
  }

  @Readonly
  public getStatuses(): void {
    const requestService: IRequestService = this.getRequestService();
    requestService.getStatuses(
      (value) => {
        this.setDispatchers(value);
      },
      (value, caught) => {
        const apiService: ApiService = this.getApiService();
        return this.defaultErrorHandler(value, apiService.read.method);
      });
  }

  @Readonly
  public getTypes(): void {
    const requestService: IRequestService = this.getRequestService();
    requestService.getTypes(
      (value) => {
        this.setDispatcherTypes(value);
      },
      (value, caught) => {
        const apiService: ApiService = this.getApiService();
        return this.defaultErrorHandler(value, apiService.read.method);
      });
  }

  @Readonly
  public cleanLastErrors(): void {
    this.Lock(this.GLOBAL_ID, this.CLEAN_LAST_ERRORS_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.cleanLastErrors(
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.CLEAN_LAST_ERRORS_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.CLEAN_LAST_ERRORS_OPERATION);
          });
      });
  }

  @Readonly
  public saveConfiguration(): void {
    this.Lock(this.GLOBAL_ID, this.SAVE_CONFIGURATION_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.saveConfiguration(
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.SAVE_CONFIGURATION_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.SAVE_CONFIGURATION_OPERATION);
          });
      });
  }

  @Readonly
  public startAll(): void {
    this.Lock(this.GLOBAL_ID, this.START_ALL_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.startAll(
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.START_ALL_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.START_ALL_OPERATION);
          });
      });
  }

  @Readonly
  public abortAll(): void {
    this.Lock(this.GLOBAL_ID, this.ABORT_ALL_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.abortAll(
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.ABORT_ALL_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.ABORT_ALL_OPERATION);
          });
      });
  }

  @Readonly
  public resetAll(): void {
    this.Lock(this.GLOBAL_ID, this.RESET_ALL_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.resetAll(
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.RESET_ALL_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.RESET_ALL_OPERATION);
          });
      });
  }

  @Readonly
  public stopAll(): void {
    this.Lock(this.GLOBAL_ID, this.STOP_ALL_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.stopAll(
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.STOP_ALL_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.STOP_ALL_OPERATION);
          });
      });
  }

  @Readonly
  @Validate
  public addOne(@Required object: any): void {
    this.Lock(this.GLOBAL_ID, this.ADD_ONE_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.addOne(
      {
        description: object.description,
        type: object.type,
        inputHost: object.inputHost,
        inputPort: object.inputPort,
        inputUser: object.inputUser,
        inputPassword: object.inputPassword,
        inputVhost: object.inputVhost,
        inputPrefetch: object.inputPrefetch,
        inputExchange: object.inputExchange,
        inputQueue: object.inputQueue,
        inputRoutingKey: object.inputRoutingKey,
        outputHost: object.outputHost,
        outputPort: object.outputPort,
        outputUser: object.outputUser,
        outputPassword: object.outputPassword,
        outputVhost: object.outputVhost,
        outputPrefetch: object.outputPrefetch,
        outputExchange: object.outputExchange,
        outputQueue: object.outputQueue,
        outputRoutingKey: object.outputRoutingKey
      },
      (value) => {
        this.guard(() => {
            this.saveConfiguration();
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.ADD_ONE_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.create.method);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.ADD_ONE_OPERATION);
          });
      });
  }

  @Readonly
  @Validate
  public removeOne(@Required id: string): void {
    this.Lock(id, this.REMOVE_ONE_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.removeOne(
      {id: id},
      (value) => {
        this.guard(() => {
            this.saveConfiguration();
          },
          () => {
            this.Unlock(id, this.REMOVE_ONE_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.remove.method);
          },
          () => {
            this.Unlock(id, this.REMOVE_ONE_OPERATION);
          });
      });
  }

  @Readonly
  @Validate
  public startOne(@Required id: string): void {
    this.Lock(id, this.START_ONE_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.startOne(
      {id: id},
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(id, this.START_ONE_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(id, this.START_ONE_OPERATION);
          });
      });
  }

  @Readonly
  @Validate
  public abortOne(@Required id: string): void {
    this.Lock(id, this.ABORT_ONE_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.abortOne(
      {id: id},
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(id, this.ABORT_ONE_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(id, this.ABORT_ONE_OPERATION);
          });
      });
  }

  @Readonly
  @Validate
  public resetOne(@Required id: string): void {
    this.Lock(id, this.RESET_ONE_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.resetOne(
      {id: id},
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(id, this.RESET_ONE_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(id, this.RESET_ONE_OPERATION);
          });
      });
  }

  @Readonly
  @Validate
  public stopOne(@Required id: string): void {
    this.Lock(id, this.STOP_ONE_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.stopOne(
      {id: id},
      (value) => {
        this.guard(() => {
            this.getStatuses();
          },
          () => {
            this.Unlock(id, this.STOP_ONE_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.update.method);
          },
          () => {
            this.Unlock(id, this.STOP_ONE_OPERATION);
          });
      });
  }

  @Readonly
  public shutdown(): void {
    this.Lock(this.GLOBAL_ID, this.SHUTDOWN_OPERATION);
    const requestService: IRequestService = this.getRequestService();
    requestService.shutdown(
      (value) => {
        this.guard(() => {},
          () => {
            this.Unlock(this.GLOBAL_ID, this.SHUTDOWN_OPERATION);
          });
      },
      (value, caught) => {
        return this.guard(() => {
            const apiService: ApiService = this.getApiService();
            return this.defaultErrorHandler(value, apiService.management.method);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.SHUTDOWN_OPERATION);
          });
      });
  }
}
