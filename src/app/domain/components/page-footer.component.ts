import {Component} from '@angular/core';

import {Readonly} from '@domain/aop';

@Component({
  selector: 'page-footer-outlet',
  templateUrl: '../views/page-footer.html',
  styleUrls: ['../styles/page-footer.less']
})
export class PageFooterComponent {
  private date: Date;

  constructor() {
    this.date = new Date();
  }

  @Readonly
  public getCopyrightYear(): string {
    const year: number = this.date.getFullYear();
    return (year > 2018) ? `2018—${year}` : '2018';
  }
}
