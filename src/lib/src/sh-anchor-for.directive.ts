import {Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {ShContextMenuService} from './sh-context-menu.service';
import {ShContextMenuComponent} from './sh-context-menu.component';
import {Subscription} from 'rxjs/Subscription';
import {fromEvent} from 'rxjs/observable/fromEvent';

@Directive({
  selector: '[shAnchorFor]'
})
export class ShAnchorForDirective implements OnDestroy {
  @Input('shAnchorFor') menu: ShContextMenuComponent;
  @Input('shMenuData') data: any;

  sub: Subscription;

  constructor(private ctxService: ShContextMenuService, private elm: ElementRef) {
    this.sub = fromEvent(this.elm.nativeElement, 'contextmenu')
      .subscribe(this.openMenu.bind(this));
  }

  openMenu(event: MouseEvent) {
    this.ctxService.openMenu({
      menu: this.menu,
      mouseEvent: event,
      targetElement: this.elm,
      data: this.data
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
