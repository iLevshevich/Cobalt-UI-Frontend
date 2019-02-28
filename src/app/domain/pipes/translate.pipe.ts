import {Inject, Pipe, PipeTransform} from '@angular/core';

import {Readonly, Required, Validate} from '@domain/aop';
import {ITranslateService, TranslateService} from '@domain/services';
import {Objects} from '@domain/utils';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(@Inject(TranslateService) private _translate: ITranslateService) {
  }

  @Readonly
  @Validate
  public transform(@Required value: string,
                   @Required args: any[]): any {
    if (Objects.isUndefined(value) || Objects.isNull(value)) {
      return;
    }
    return this._translate.translate(value);
  }
}
