import {ShContextMenuComponent} from './sh-context-menu.component';
import {ElementRef} from '@angular/core';

export class ShContextMenuEvent {
  menu: ShContextMenuComponent;
  mouseEvent: MouseEvent;
  targetElement: ElementRef;
  data: any;
}

export class ShContextSubMenuEvent extends ShContextMenuEvent {
  parentMenu: ShContextMenuComponent;
}

export class ShContextMenuClickEvent {
  data: any;
  event?: MouseEvent;
}
