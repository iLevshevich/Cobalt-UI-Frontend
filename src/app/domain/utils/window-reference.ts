import { Injectable } from '@angular/core';

@Injectable()
export class WindowReference {
  public get nativeWindow(): any {
    return this._window();
  }

  private _window(): any {
    return window;
  }
}

