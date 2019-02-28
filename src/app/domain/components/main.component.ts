import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {interval} from 'rxjs/index';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';

import {Readonly, Required, Validate} from '@domain/aop';
import {
  ApiService,
  IGrantsService, GrantsService,
  IErrorDecodeService, ErrorDecodeService,
  IAlertService, AlertService,
  IRequestService, RequestService
} from '@domain/services';
import {ComponentOperations} from '@domain/models';
import {
  ShutdownDialogComponent,
  RemoveDialogComponent,
  AddDialogComponent,
  DetailsDialogComponent
} from '@domain/components/dialogs';
import {WindowReference} from '@domain/utils';

@Component({
  templateUrl: '../views/main.html',
  styleUrls: ['../styles/main.less'],
})
export class MainComponent extends ComponentOperations implements OnInit, OnDestroy {
  public readonly ACTION_RUN: string = 'Run';
  public readonly ACTION_RESET: string = 'Reset';
  public readonly ACTION_ABORT: string = 'Abort';
  public readonly ACTION_STOP: string = 'Stop';
  public readonly ACTION_REMOVE: string = 'Remove';
  public readonly ACTION_ADD: string = 'Add';
  public readonly ACTION_REFRESH: string = 'Refresh';

  private readonly DIALOG_WIDTH: string = '570px';
  private readonly DETAILS_DIALOG_WIDTH: string = '640px';
  private readonly DIALOG_TOP: string = '80px';

  public readonly timeout: number = 5000;
  private interval$: Subscription;
  private dispatchers: Array<any> = [];
  private types: Array<string> = [];

  public running = false;
  public aborted = false;
  public stopped = false;
  public identical = false;

  constructor(private apiService_: ApiService,
              private dialog_: MatDialog,
              private reference_: WindowReference,
              @Inject(GrantsService) private grantsService_: IGrantsService,
              @Inject(ErrorDecodeService) private decodeService_: IErrorDecodeService,
              @Inject(AlertService) private alertService_: IAlertService,
              @Inject(RequestService) private requestService_: IRequestService) {
    super();
  }

  public ngOnInit() {
    this.interval$ = interval(this.timeout)
      .subscribe(res => {
        this.getStatuses();
      });
    this.getStatuses();
    this.getTypes();
  }

  public ngOnDestroy(): void {
    this.interval$
      .unsubscribe();
  }

  @Readonly
  public getRequestService(): IRequestService {
    return this.requestService_;
  }

  @Readonly
  public getApiService(): ApiService {
    return this.apiService_;
  }

  @Readonly
  public getDecodeService(): IErrorDecodeService {
    return this.decodeService_;
  }

  @Readonly
  public getAlertService(): IAlertService {
    return this.alertService_;
  }

  @Readonly
  public getGrantsService(): IGrantsService {
    return this.grantsService_;
  }

  @Readonly
  public getDispatchers(): Array<any> {
    return this.dispatchers;
  }

  @Readonly
  @Validate
  public setDispatchers(@Required response: any): void {
    this.dispatchers = response.dispatchers;
    {
      this.running = this.isAnyDispatchersRunning();
      this.aborted = this.isAnyDispatchersAborted();
      this.stopped = this.isAnyDispatchersStopped();
      this.identical = this.isDispatchersIdentical();
    }
  }

  @Readonly
  public getDispatcherTypes(): Array<string> {
    return this.types;
  }

  @Readonly
  @Validate
  public setDispatcherTypes(@Required response: any): void {
    this.types = response.types;
  }

  @Readonly
  @Validate
  public onChange(@Required action: string): void {
    if (this.isActionRun(action)) {
      if (this.isDispatchersIdentical()) {
        this.startAll();
      } else {
        this.dispatchers
          .filter(item => {
            return this.isDispatcherStopped(item);
          })
          .forEach(item => {
            this.startOne(item.id);
          });
      }
    }

    if (this.isActionReset(action)) {
      if (this.isDispatchersIdentical()) {
        this.resetAll();
      } else {
        this.dispatchers
          .filter(item => {
            return this.isDispatcherAborted(item);
          })
          .forEach(item => {
            this.resetOne(item.id);
          });
      }
    }

    if (this.isActionAbort(action)) {
      if (this.isDispatchersIdentical()) {
        this.abortAll();
      } else {
        this.dispatchers
          .filter(item => {
            return this.isDispatcherRunning(item);
          })
          .forEach(item => {
            this.abortOne(item.id);
          });
      }
    }

    if (this.isActionStop(action)) {
      if (this.isDispatchersIdentical() && this.isDispatchersQueueEmpty()) {
        this.stopAll();
      } else {
        this.dispatchers
          .filter(item => {
            return this.isDispatcherAborted(item) && this.isDispatcherQueueEmpty(item);
          })
          .forEach(item => {
            this.stopOne(item.id);
          });
      }
    }

    if (this.isActionRefresh(action)) {
      this.refresh();
    }
  }

  @Readonly
  @Validate
  public onChangeOne(@Required action: string,
                     @Required element: any): void {
    if (this.isActionRun(action)) {
      this.startOne(element.id);
    }

    if (this.isActionReset(action)) {
      this.resetOne(element.id);
    }

    if (this.isActionAbort(action)) {
      this.abortOne(element.id);
    }

    if (this.isActionStop(action)) {
      this.stopOne(element.id);
    }

    if (this.isActionRemove(action)) {
      this.dialog_.open(RemoveDialogComponent,
        {
          width: this.DIALOG_WIDTH,
          data: {
            actionOk:
              () => {
                this.removeOne(element.id);
              },
            element: element
          },
          position: {
            top: this.DIALOG_TOP
          }
        });
    }

    if (this.isActionAdd(action)) {
      this.dialog_.open(AddDialogComponent,
        {
          width: this.DIALOG_WIDTH,
          data: {
            types: this.getDispatcherTypes(),
            actionOk:
              (object) => {
                this.addOne(object);
              }
          },
          position: {
            top: this.DIALOG_TOP
          }
        });
    }
  }

  @Readonly
  @Validate
  public onDetails(@Required element: any): void {
    this.dialog_.open(DetailsDialogComponent,
      {
        width: this.DETAILS_DIALOG_WIDTH,
        data: {
          element: element
        },
        position: {
          top: this.DIALOG_TOP
        }
      });
  }

  @Readonly
  @Validate
  public onShutdown(): void {
    this.dialog_.open(ShutdownDialogComponent,
      {
        width: this.DIALOG_WIDTH,
        data: {
          actionOk:
            () => {
              {
                this.shutdown();
              }
              this.close(() => {
                this.reference_.nativeWindow.open(location, '_self', '').close();
              }, 5000);
            }
        },
        position: {
          top: this.DIALOG_TOP
        }
      });
  }

  @Readonly
  @Validate
  private async close(@Required action: () => void,
                      @Required ms: number): Promise<void> {
    let doClose = false;
    while (!doClose) {
      await new Promise<void>(resolve => {
        setTimeout(resolve, ms);
      });
      doClose = true;
    }
    action();
  }

  @Readonly
  @Validate
  private isActionRun(@Required action: string): boolean {
    return action === this.ACTION_RUN;
  }

  @Readonly
  @Validate
  private isActionReset(@Required action: string): boolean {
    return action === this.ACTION_RESET;
  }

  @Readonly
  @Validate
  private isActionAbort(@Required action: string): boolean {
    return action === this.ACTION_ABORT;
  }

  @Readonly
  @Validate
  private isActionStop(@Required action: string): boolean {
    return action === this.ACTION_STOP;
  }

  @Readonly
  @Validate
  private isActionRemove(@Required action: string): boolean {
    return action === this.ACTION_REMOVE;
  }

  @Readonly
  @Validate
  private isActionAdd(@Required action: string): boolean {
    return action === this.ACTION_ADD;
  }

  @Readonly
  @Validate
  private isActionRefresh(@Required action: string): boolean {
    return action === this.ACTION_REFRESH;
  }
}
