export enum DispatchersType {
  TcpToAmqp = 'TcpToAmqp',
  AmqpToAmqp = 'AmqpToAmqp',
  TcpToTcp = 'TcpToTcp',
  AmqpToTcp = 'AmqpToTcp'
}

export namespace DispatchersType {
  export function isInputTcpType(value: string): boolean | null {
    switch (value) {
      case DispatchersType.TcpToAmqp.toString():
        return true;
      case DispatchersType.AmqpToAmqp.toString():
        return false;
      case DispatchersType.TcpToTcp.toString():
        return true;
      case DispatchersType.AmqpToTcp.toString():
        return false;
      default:
        return null;
    }
  }

  export function isInputAmqpType(value: string): boolean | null {
    switch (value) {
      case DispatchersType.TcpToAmqp.toString():
        return false;
      case DispatchersType.AmqpToAmqp.toString():
        return true;
      case DispatchersType.TcpToTcp.toString():
        return false;
      case DispatchersType.AmqpToTcp.toString():
        return true;
      default:
        return null;
    }
  }

  export function isOutputTcpType(value: string): boolean | null {
    switch (value) {
      case DispatchersType.TcpToAmqp.toString():
        return false;
      case DispatchersType.AmqpToAmqp.toString():
        return false;
      case DispatchersType.TcpToTcp.toString():
        return true;
      case DispatchersType.AmqpToTcp.toString():
        return true;
      default:
        return null;
    }
  }

  export function isOutputAmqpType(value: string): boolean | null {
    switch (value) {
      case DispatchersType.TcpToAmqp.toString():
        return true;
      case DispatchersType.AmqpToAmqp.toString():
        return true;
      case DispatchersType.TcpToTcp.toString():
        return false;
      case DispatchersType.AmqpToTcp.toString():
        return false;
      default:
        return null;
    }
  }
}
