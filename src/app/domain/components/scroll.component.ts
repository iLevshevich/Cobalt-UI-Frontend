import {Component, HostListener, Input} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

import {Validate, Required, Readonly} from '@domain/aop';
import {Objects} from '@domain/utils';

@Component({
  selector: 'scroll-outlet',
  templateUrl: '../views/scroll.html',
  styleUrls: ['../styles/scroll.less'],
  animations: [
    trigger('appearInOut', [
      state('show', style({
        'display': 'block',
        'opacity': '0.95'
      })),
      state('hide', style({
        'display': 'none',
        'opacity': '0'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ]),
  ],
})
export class ScrollComponent {
  public state: string;
  private timer: any;

  @Input() public distance: number;
  @Input() public speed: number;

  constructor() {
    this.state = 'hide';
    this.timer = null;
  }

  @Readonly
  @HostListener('window:scroll', [])
  public onWindowScroll() {
    if (Objects.isDefined(window)) {
      this.state = this.getAnimationState();
    }
  }

  @Readonly
  @Validate
  public onScrollTop(@Required event: any) {
    if (Objects.isUndefined(window)) {
      return;
    }
    event.preventDefault();

    if (Objects.isNull(this.timer)) {
      this.timer = setInterval(() => {
        window.scrollBy(0, -this.speed);
        if (this.isTopScrollPosition()) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 15);
    }
  }

  @Readonly
  private getAnimationState(): string {
    return this.getCurrentScrollPosition() > this.distance ? 'show' : 'hide';
  }

  @Readonly
  private isTopScrollPosition(): boolean {
    return this.getCurrentScrollPosition() === 0;
  }

  @Readonly
  private getCurrentScrollPosition(): number {
    if (Objects.isDefined(window.scrollY) && window.scrollY >= 0) {
      return window.scrollY;
    }

    if (Objects.isDefined(window.pageYOffset) && window.pageYOffset >= 0) {
      return window.pageYOffset;
    }

    if (Objects.isDefined(document.body.scrollTop) && document.body.scrollTop >= 0) {
      return document.body.scrollTop;
    }

    if (Objects.isDefined(document.documentElement.scrollTop) && document.documentElement.scrollTop >= 0) {
      return document.documentElement.scrollTop;
    }

    return 0;
  }
}
