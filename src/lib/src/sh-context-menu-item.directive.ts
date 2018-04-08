import {Directive, Input, OnInit, Optional, TemplateRef} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';

export class MenuItemContext {
  $implicit: any;
  subscriber: {
    click?: any
  };

  constructor() {
    this.subscriber = {};
    this.$implicit = {};
  }
}

@Directive({
  selector: '[shContextMenuItem]'
})
export class ShContextMenuItemDirective {
  @Input('shContextMenuItemWith') subMenu: ShContextMenuComponent;
  @Input('shContextMenuItemOn') on: (data) => {};

  @Input() divider = false;

  open: boolean;
  context: MenuItemContext = new MenuItemContext();

  constructor(@Optional() public template: TemplateRef<MenuItemContext>) {
  }
}
