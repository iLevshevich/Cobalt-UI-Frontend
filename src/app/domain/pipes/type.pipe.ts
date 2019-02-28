import {Pipe, PipeTransform} from '@angular/core';

import {Readonly, Required, Validate} from '@domain/aop';
import {Objects} from '@domain/utils';
import {DispatchersType} from '@domain/models';

@Pipe({
  name: 'type',
  pure: false
})
export class TypePipe implements PipeTransform {
  private readonly TCP_TEMPLATE: string = 'TCP';
  private readonly AMQP_TEMPLATE: string = 'AMQP';

  @Readonly
  @Validate
  public transform(@Required value: any): any {
    if (Objects.isUndefined(value) || Objects.isNull(value)) {
      return;
    }

    switch (value) {
      case DispatchersType.TcpToAmqp.toString():
        return `${this.TCP_TEMPLATE} -> ${this.AMQP_TEMPLATE}`;
      case DispatchersType.AmqpToAmqp.toString():
        return `${this.AMQP_TEMPLATE} -> ${this.AMQP_TEMPLATE}`;
      case DispatchersType.TcpToTcp.toString():
        return `${this.TCP_TEMPLATE} -> ${this.TCP_TEMPLATE}`;
      case DispatchersType.AmqpToTcp.toString():
        return `${this.AMQP_TEMPLATE} -> ${this.TCP_TEMPLATE}`;
      default:
        return value;
    }
  }
}
