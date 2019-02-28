import {Validate, Required, Readonly, Sealed} from '@domain/aop';
import {Objects} from '@domain/utils';

export interface IChain<T, R> {
  execute(data: T): R;
}

@Sealed
export class Chain<T, R> implements IChain<T, R> {
  private executor: (data: T) => { operation: boolean, result: R };
  private next: IChain<T, R>;

  constructor(executor: (data: T) => { operation: boolean, result: R },
              next?: IChain<T, R>) {
    this.executor = executor;
    this.next = next;
  }

  @Readonly
  @Validate
  public execute(@Required data: T): R {
    const result: { operation: boolean, result: R } = this.executor(data);
    if (result.operation === true) {
      return result.result;
    }

    if (Objects.isDefined(this.next) && Objects.isNonNull(this.next)) {
      return this.next.execute(data);
    }

    return null;
  }
}


