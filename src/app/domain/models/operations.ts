import {Required, Validate} from '@domain/aop';
import {IHandlers, Handlers} from '@domain/models/handlers';

export interface IOperations extends IHandlers {
  guard(tryStatements: () => any,
        finallyStatements: () => void): any;
}

export abstract class Operations extends Handlers implements IOperations {
  @Validate
  public guard(@Required tryStatements: () => any,
               @Required finallyStatements: () => void): any {
    try {
      return tryStatements();
    } finally {
      finallyStatements();
    }
  }
}
