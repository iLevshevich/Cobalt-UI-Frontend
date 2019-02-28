import {Injectable, Injector} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {Validate, Required, Readonly} from '@domain/aop';
import {Objects} from '@domain/utils';
import {IBtoaService, BtoaService} from '@domain/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly loginPath: string = '/login';

  constructor(private router_: Router,
              private injector_: Injector) {
  }

  @Readonly
  @Validate
  public canActivate(@Required route: ActivatedRouteSnapshot,
                     @Required state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authService: IBtoaService = this.getService();
    if (!authService.isEmpty()) {
      return true;
    }
    {
      this.router_.navigate([this.loginPath]);
    }
    return false;
  }

  @Readonly
  private getService(): IBtoaService {
    const service: IBtoaService = this.injector_.get(BtoaService);
    if (Objects.isUndefined(service) || Objects.isNull(service)) {
      throw new Error('AuthInterceptor::getService(): Invalid btoa service');
    }
    return service;
  }
}
