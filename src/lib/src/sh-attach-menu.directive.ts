import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ShContextMenuService} from './sh-context-menu.service';
import {ShContextMenuComponent} from './sh-context-menu.component';
import {Subscription} from 'rxjs/Subscription';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {merge} from 'rxjs/observable/merge';

@Directive({
  selector: '[shAttachMenu]'
})
export class ShAttachMenuDirective implements OnDestroy, OnInit {
  @Input('shAttachMenu') menu: ShContextMenuComponent;
  @Input('shMenuTriggers') triggers: string[];
  @Input('shMenuData') data: any;
  sub: Subscription;

  constructor(private ctxService: ShContextMenuService, private elm: ElementRef) {
  }

  ngOnInit(): void {
    this.setupEvents();
  }

  private setupEvents() {
    const observables = [];

    if (!this.triggers) {
      observables.push(fromEvent(this.elm.nativeElement, 'contextmenu'));
    } else {
      this.triggers.forEach((t) => {
        observables.push(fromEvent(this.elm.nativeElement, t));
      });
    }

    this.sub = merge(...observables).subscribe(this.openMenu.bind(this));
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
