import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs/index';
import {HttpErrorResponse} from '@angular/common/http';

import {Readonly, Required, Validate} from '@domain/aop';
import {
  ApiService,
  IGrantsService, GrantsService,
  IErrorDecodeService, ErrorDecodeService,
  IAuthService, AuthService,
  ITranslateService, TranslateService,
  IAlertService, AlertService
} from '@domain/services';
import {ComponentLocks} from '@domain/models';

@Component({
  templateUrl: '../views/login.html',
  styleUrls: ['../styles/login.less'],
})
export class LoginComponent extends ComponentLocks implements OnInit {
  public readonly GLOBAL_ID: string = 'GLOBAL';
  public readonly LOGIN_OPERATION: string = 'LOGIN';

  private readonly mainPath: string = '/main';
  private readonly authenticateStatusCode: number = 401;
  public loginForm: FormGroup;

  constructor(private formBuilder_: FormBuilder,
              private router_: Router,
              private apiService_: ApiService,
              @Inject(GrantsService) private grantsService_: IGrantsService,
              @Inject(ErrorDecodeService) private decodeService_: IErrorDecodeService,
              @Inject(AlertService) private alertService_: IAlertService,
              @Inject(TranslateService) private translateService_: ITranslateService,
              @Inject(AuthService) private authService_: IAuthService) {
    super();
  }

  public ngOnInit(): void {
    {
      this.authService_.logout();
    }
    this.loginForm = this.formBuilder_
      .group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  @Readonly
  public onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.Lock(this.GLOBAL_ID, this.LOGIN_OPERATION);
    this.authService_.login(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value,
      response => {
        this.guard(() => {
            {
              this.grantsService_.copy(response);
            }
            this.router_.navigate([this.mainPath]);
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.LOGIN_OPERATION);
          });
      },
      (error, caught) => {
        return this.guard(() => {
            this.loginForm.controls.username.setErrors({AuthenticateError: true});
            this.loginForm.controls.password.setErrors({AuthenticateError: true});
            {
              return this.errorHandler(error, this.apiService_.read.method);
            }
          },
          () => {
            this.Unlock(this.GLOBAL_ID, this.LOGIN_OPERATION);
          });
      });
  }

  @Readonly
  @Validate
  private errorHandler(@Required err: HttpErrorResponse | any,
                       @Required method: string | 'GET' | 'POST' | 'PUT' | 'DELETE'): Observable<any> {
    if (err.status === this.authenticateStatusCode) {
      return this.authenticateErrorHandler(err);
    }
    return this.defaultErrorHandler(err, method);
  }

  @Readonly
  @Validate
  private authenticateErrorHandler(@Required err: HttpErrorResponse | any): Observable<any> {
    const message: string = this.translateService_.translate('Authenticate');
    {
      this.alertService_.error(message);
    }
    console.error(message);
    return throwError(message);
  }

  public getDecodeService(): IErrorDecodeService {
    return this.decodeService_;
  }

  public getAlertService(): IAlertService {
    return this.alertService_;
  }
}
