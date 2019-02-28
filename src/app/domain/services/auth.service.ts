import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface IAuthService {
  login(username: string,
        password: string,
        response: (value: HttpResponse<any>) => void,
        error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  logout(): void;
}

export abstract class AuthService implements IAuthService {
  abstract login(username: string,
                 password: string,
                 response: (value: HttpResponse<any>) => void,
                 error: (value: HttpErrorResponse | any, caught: Observable<any>) => Observable<any>): void;

  abstract logout(): void;
}

