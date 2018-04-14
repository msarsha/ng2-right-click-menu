import {ShContextMenuComponent} from './sh-context-menu.component';
import {ElementRef} from '@angular/core';

export class ContextMenuEvent {
  menu: ShContextMenuComponent;
  mouseEvent: MouseEvent;
  targetElement: ElementRef;
  data: any;
}

export class ContextSubMenuEvent extends ContextMenuEvent {
  parentMenu: ShContextMenuComponent;
}

export class ContextMenuClickEvent {
  data: any;
  event: MouseEvent;
}
