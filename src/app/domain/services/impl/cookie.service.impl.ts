import {Injectable, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {Validate, Required, Readonly} from '@domain/aop';
import {Objects, StringBuilder} from '@domain/utils';
import {CookieServiceService} from '@domain/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceImpl extends CookieServiceService {
  constructor(@Inject(DOCUMENT) private document: any) {
    super();
  }

  @Readonly
  @Validate
  public getCookie(@Required name: string): string {
    if (Objects.isDefined(this.document)) {
      const cookieName = `${name}=`;
      const cookies: Array<string> = document.cookie.split(';');
      const length: number = cookies.length;

      for (let i = 0; i < length; i += 1) {
        const cookie = cookies[i].replace(/^\s+/g, '');
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
    }
    return '';
  }

  @Readonly
  @Validate
  public setCookie(@Required name: string,
                   @Required value: string,
                   @Required options: {
                     expires?: number;
                     path?: string;
                     domain?: string;
                   } = {}): void {
    if (Objects.isUndefined(this.document)) {
      return;
    }

    const builder: StringBuilder = new StringBuilder();
    {
      builder
        .append(encodeURIComponent(name))
        .append('=')
        .append(encodeURIComponent(value))
        .append(';');

      if (Objects.isDefined(options.expires) && Objects.isNonNull(options.expires)) {
        const expires: Date = new Date(new Date().getTime() + options.expires * 1000 * 60 * 60 * 24);
        builder
          .append('expires')
          .append('=')
          .append(expires.toUTCString())
          .append(';');
      }

      if (Objects.isDefined(options.path) && Objects.isNonNull(options.path)) {
        builder
          .append('path')
          .append('=')
          .append(options.path)
          .append(';');
      }

      if (Objects.isDefined(options.domain) && Objects.isNonNull(options.domain)) {
        builder
          .append('domain')
          .append('=')
          .append(options.domain)
          .append(';');
      }
    }
    this.document.cookie = builder.toString();
  }

  @Readonly
  @Validate
  public removeCookie(@Required name: string,
                      @Required options: {
                        path?: string;
                        domain?: string;
                      } = {}): void {
    this.setCookie(name, '', {expires: -1, path: options.path, domain: options.domain});
  }
}
