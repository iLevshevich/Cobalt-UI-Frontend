import {Inject, Pipe, PipeTransform} from '@angular/core';

import {Readonly, Required, Validate} from '@domain/aop';
import {ITranslateService, TranslateService} from '@domain/services';
import {Objects} from '@domain/utils';

@Pipe({
  name: 'translate_state',
  pure: false
})
export class TranslateStatePipe implements PipeTransform {
  constructor(@Inject(TranslateService) private _translate: ITranslateService) {
  }

  @Readonly
  @Validate
  public transform(@Required value: { Running: boolean, Aborted: boolean, Stopped: boolean },
                   @Required args: any[]): any {
    if (Objects.isUndefined(value) || Objects.isNull(value)) {
      return;
    }

    if (value.Running) {
      return this._translate.translate('Running');
    }

    if (value.Aborted) {
      return this._translate.translate('Aborted');
    }

    if (value.Stopped) {
      return this._translate.translate('Stopped');
    }
  }
}
