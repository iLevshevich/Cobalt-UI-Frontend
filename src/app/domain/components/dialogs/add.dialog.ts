import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Readonly} from '@domain/aop';
import {Objects} from '@domain/utils';
import {DispatchersType} from '@domain/models';

export class AddDialogActionType {
  description: string;
  type: string;
  inputHost: string;
  inputPort: string;
  inputUser: string;
  inputPassword: string;
  inputVhost: string;
  inputPrefetch: string;
  inputExchange: string;
  inputQueue: string;
  inputRoutingKey: string;
  outputHost: string;
  outputPort: string;
  outputUser: string;
  outputPassword: string;
  outputVhost: string;
  outputPrefetch: string;
  outputExchange: string;
  outputQueue: string;
  outputRoutingKey: string;
}

export interface AddDialogData {
  types: Array<string>;
  actionOk: (value: AddDialogActionType | any) => void;
  actionCancel?: () => void;
}

@Component({
  templateUrl: '../../views/dialogs/add-dialog.html',
  styleUrls: ['../../styles/dialogs/add-dialog.less'],
})
export class AddDialogComponent implements OnInit {
  private readonly DEFAULT_PREFETCH_VALUE: string = '1000';

  public typeForm: FormGroup;
  public descriptionForm: FormGroup;
  public inputForm: FormGroup;
  public outputForm: FormGroup;

  constructor(private ref: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: AddDialogData,
              private formBuilder_: FormBuilder) {
  }

  public ngOnInit(): void {
    this.typeForm = this.formBuilder_
      .group({
        type: ['', Validators.required]
      });

    this.descriptionForm = this.formBuilder_
      .group({
        description: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ]
      });

    this.inputForm = this.formBuilder_
      .group({
        host: ['',
          [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(15),
            Validators.pattern('^([0-9]{1,3})\\.([0-9]{1,3})\\.([0-9]{1,3})\\.([0-9]{1,3})$')
          ]
        ],
        port: ['',
          [
            Validators.required,
            Validators.maxLength(5),
            Validators.pattern('^([\\d]+)$')
          ]
        ],
        user: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
            Validators.pattern('^([\\w]+)$')
          ]
        ],
        password: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
        vhost: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
        exchange: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
        queue: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
        routingKey: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
      });

    this.outputForm = this.formBuilder_
      .group({
        host: ['',
          [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(15),
            Validators.pattern('^([0-9]{1,3})\\.([0-9]{1,3})\\.([0-9]{1,3})\\.([0-9]{1,3})$')
          ]
        ],
        port: ['',
          [
            Validators.required,
            Validators.maxLength(5),
            Validators.pattern('^([\\d]+)$')
          ]
        ],
        user: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
            Validators.pattern('^([\\w]+)$')
          ]
        ],
        password: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
        vhost: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
        exchange: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
        queue: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
        routingKey: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
      });
  }

  @Readonly
  public OnSelectTypeChange(): void {
    if (!this.isInputAmqpType()) {
      this.getInputUser().disable();
      this.getInputPassword().disable();
      this.getInputVhost().disable();
      this.getInputExchange().disable();
      this.getInputQueue().disable();
      this.getInputRoutingKey().disable();
    } else {
      this.getInputUser().enable();
      this.getInputPassword().enable();
      this.getInputVhost().enable();
      this.getInputExchange().enable();
      this.getInputQueue().enable();
      this.getInputRoutingKey().enable();
    }

    if (!this.isOutputAmqpType()) {
      this.getOutputUser().disable();
      this.getOutputPassword().disable();
      this.getOutputVhost().disable();
      this.getOutputExchange().disable();
      this.getOutputQueue().disable();
      this.getOutputRoutingKey().disable();
    } else {
      this.getOutputUser().enable();
      this.getOutputPassword().enable();
      this.getOutputVhost().enable();
      this.getOutputExchange().enable();
      this.getOutputQueue().enable();
      this.getOutputRoutingKey().enable();
    }
  }

  @Readonly
  public onOk(): void {
    if (Objects.isDefined(this.data.actionOk) && Objects.isNonNull(this.data.actionOk)) {
      const value: AddDialogActionType = new AddDialogActionType();
      {
        value.description = this.getDescription().value;
        value.type = this.getType().value;

        value.inputHost = this.getInputHost().value;
        value.inputPort = this.getInputPort().value;

        if (this.isInputAmqpType()) {
          value.inputUser = this.getInputUser().value;
          value.inputPassword = this.getInputPassword().value;
          value.inputVhost = this.getInputVhost().value;
          value.inputPrefetch = this.DEFAULT_PREFETCH_VALUE;
          value.inputExchange = this.getInputExchange().value;
          value.inputQueue = this.getInputQueue().value;
          value.inputRoutingKey = this.getInputRoutingKey().value;
        }

        value.outputHost = this.getOutputHost().value;
        value.outputPort = this.getOutputPort().value;

        if (this.isOutputAmqpType()) {
          value.outputUser = this.getOutputUser().value;
          value.outputPassword = this.getOutputPassword().value;
          value.outputVhost = this.getOutputVhost().value;
          value.outputPrefetch = this.DEFAULT_PREFETCH_VALUE;
          value.outputExchange = this.getOutputExchange().value;
          value.outputQueue = this.getOutputQueue().value;
          value.outputRoutingKey = this.getOutputRoutingKey().value;
        }
      }
      this.data.actionOk(value);
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
  public getTypes(): Array<string> {
    return this.data.types;
  }

  @Readonly
  public getType(): AbstractControl | null {
    return this.typeForm.get('type');
  }

  @Readonly
  public getDescription(): AbstractControl | null {
    return this.descriptionForm.get('description');
  }

  @Readonly
  public getInputHost(): AbstractControl | null {
    return this.inputForm.get('host');
  }

  @Readonly
  public getInputPort(): AbstractControl | null {
    return this.inputForm.get('port');
  }

  @Readonly
  public getInputUser(): AbstractControl | null {
    return this.inputForm.get('user');
  }

  @Readonly
  public getInputPassword(): AbstractControl | null {
    return this.inputForm.get('password');
  }

  @Readonly
  public getInputVhost(): AbstractControl | null {
    return this.inputForm.get('vhost');
  }

  @Readonly
  public getInputExchange(): AbstractControl | null {
    return this.inputForm.get('exchange');
  }

  @Readonly
  public getInputQueue(): AbstractControl | null {
    return this.inputForm.get('queue');
  }

  @Readonly
  public getInputRoutingKey(): AbstractControl | null {
    return this.inputForm.get('routingKey');
  }

  @Readonly
  public getOutputHost(): AbstractControl | null {
    return this.outputForm.get('host');
  }

  @Readonly
  public getOutputPort(): AbstractControl | null {
    return this.outputForm.get('port');
  }

  @Readonly
  public getOutputUser(): AbstractControl | null {
    return this.outputForm.get('user');
  }

  @Readonly
  public getOutputPassword(): AbstractControl | null {
    return this.outputForm.get('password');
  }

  @Readonly
  public getOutputVhost(): AbstractControl | null {
    return this.outputForm.get('vhost');
  }

  @Readonly
  public getOutputExchange(): AbstractControl | null {
    return this.outputForm.get('exchange');
  }

  @Readonly
  public getOutputQueue(): AbstractControl | null {
    return this.outputForm.get('queue');
  }

  @Readonly
  public getOutputRoutingKey(): AbstractControl | null {
    return this.outputForm.get('routingKey');
  }

  @Readonly
  public isInputAmqpType(): boolean {
    return DispatchersType.isInputAmqpType(this.getType().value) === true;
  }

  @Readonly
  public isOutputAmqpType(): boolean {
    return DispatchersType.isOutputAmqpType(this.getType().value) === true;
  }
}
