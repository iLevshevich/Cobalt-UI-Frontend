export interface IErrorDecodeService {
  decode(code: number, decryption: string, template: (data: any) => { error: string, empty: string, status_error: string }): { code: number, message: string };
  getTemplate(method: string | 'GET' | 'POST' | 'PUT' | 'DELETE'): (data: any) => { error: string, empty: string, status_error: string };
}

export abstract class ErrorDecodeService implements IErrorDecodeService {
  abstract decode(code: number, decryption: string, template: (data: any) => { error: string, empty: string, status_error: string }): { code: number, message: string };
  abstract getTemplate(method: string | 'GET' | 'POST' | 'PUT' | 'DELETE'): (data: any) => { error: string, empty: string, status_error: string };
}
