import {Injectable, Inject} from '@angular/core';

import {Validate, Required, Readonly} from '@domain/aop';
import {ITranslateService, TranslateService} from '@domain/services/translate.service';
import {ErrorDecodeService} from '@domain/services/error.decode.service';
import {IChain, Chain} from '@domain/chains';

@Injectable({
  providedIn: 'root',
})
export class ErrorDecodeServiceImpl extends ErrorDecodeService {
  private decodeByHttpCode: IChain<{ code: number, decryption: string, template: (message: any) => { error: string, empty: string, status_error: string } }, string> =
    new Chain<{ code: number, decryption: string, template: (message: any) => { error: string, empty: string, status_error: string } }, string>(data => {
        if (data.code === 0) {
          const message: string = this.translateService_.translate('Unknown');
          return {operation: true, result: message};
        }
        return {operation: false, result: null};
      },
      new Chain<{ code: number, decryption: string, template: (message: any) => { error: string, empty: string, status_error: string } }, string>(data => {
          if (data.code === 400) {
            const message: string = this.translateService_.translate('BadRequest');
            return {operation: true, result: message};
          }
          return {operation: false, result: null};
        },
        new Chain<{ code: number, decryption: string, template: (message: any) => { error: string, empty: string, status_error: string } }, string>(data => {
            if (data.code === 401) {
              const message: string = this.translateService_.translate('Unauthorized');
              return {operation: true, result: message};
            }
            return {operation: false, result: null};
          },
          new Chain<{ code: number, decryption: string, template: (message: any) => { error: string, empty: string, status_error: string } }, string>(data => {
              if (data.code === 403) {
                const message: string = this.translateService_.translate('Forbidden');
                return {operation: true, result: message};
              }
              return {operation: false, result: null};
            },
            new Chain<{ code: number, decryption: string, template: (message: any) => { error: string, empty: string, status_error: string } }, string>(data => {
                if (data.code === 500) {
                  const template: { read: any, create: any, update: any, remove: any } = this.translateService_.translate('Messages') as any;
                  const message: any = data.template(template).status_error;
                  return {operation: true, result: message};
                }
                return {operation: false, result: null};
              },
            new Chain<{ code: number, decryption: string, template: (message: any) => { error: string, empty: string, status_error: string } }, string>(data => {
              const template: { read: any, create: any, update: any, remove: any } = this.translateService_.translate('Messages') as any;
              const message: any = data.template(template).error
                .replace('{0}', data.code.toString())
                .replace('{1}', data.decryption);
              return {operation: true, result: message};
            }))))));

  constructor(@Inject(TranslateService) private translateService_: ITranslateService) {
    super();
  }

  @Readonly
  @Validate
  public decode(@Required code: number,
                @Required decryption: string,
                @Required template: (data: any) => { error: string, empty: string, status_error: string }): { code: number, message: string } {
    const message: string = this.decodeByHttpCode.execute({code: code, decryption: decryption, template: template});
    return {code: code, message: message};
  }

  @Readonly
  @Validate
  public getTemplate(@Required method: string | 'GET' | 'POST' | 'PUT' | 'DELETE'): (data: any) => { error: string, empty: string, status_error: string } {
    switch (method) {
      case 'GET': {
        return (template: any) => template.read;
      }
      case 'POST': {
        return (template: any) => template.create;
      }
      case 'PUT': {
        return (template: any) => template.update;
      }
      case 'DELETE': {
        return (template: any) => template.remove;
      }
      default: {
        return (template: any) => {
          throw new Error(`Invalid method value: ${template}`);
        };
      }
    }
  }
}
