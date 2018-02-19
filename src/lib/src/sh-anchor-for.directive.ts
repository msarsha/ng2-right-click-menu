import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ShContextMenuService} from './sh-context-menu.service';
import {ShContextMenuComponent} from './sh-context-menu.component';

@Directive({
  selector: '[shAnchorFor]'
})
export class ShAnchorForDirective {
  @Input('shAnchorFor') menu: ShContextMenuComponent;
  @Input('shMenuData') data: any;

  constructor(private ctxMenu: ShContextMenuService, private elm: ElementRef) { }

  @HostListener('contextmenu', ['$event'])
  openMenu(event: MouseEvent) {
    event.preventDefault();
    this.ctxMenu.openMenu(this.menu, event, this.elm);
  }
}
