export interface ICookieServiceService {
  getCookie(name: string): string;

  setCookie(name: string,
            value: string,
            options: {
              expires?: number;
              path?: string;
              domain?: string;
              secure?: boolean;
            }): void;

  removeCookie(name: string,
               options: {
                 path?: string;
                 domain?: string;
               }): void;
}

export abstract class CookieServiceService implements ICookieServiceService {
  abstract getCookie(name: string): string;

  abstract setCookie(name: string,
                     value: string,
                     options: {
                       expires?: number;
                       path?: string;
                       domain?: string;
                       secure?: boolean;
                     }): void;

  abstract removeCookie(name: string,
                        options: {
                          path?: string;
                          domain?: string;
                        }): void;
}
