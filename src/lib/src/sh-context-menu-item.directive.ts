import {Directive, Input, OnInit, Optional, TemplateRef} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';
import {ContextMenuClickEvent} from './sh-context-menu.models';

export class MenuItemContext {
  $implicit: any;

  constructor() {
    this.$implicit = {};
  }
}

@Directive({
  selector: '[shContextMenuItem]'
})
export class ShContextMenuItemDirective {
  @Input('shContextMenuItemWith') subMenu: ShContextMenuComponent;
  @Input('shContextMenuItemOn') on: (data: ContextMenuClickEvent) => {};
  @Input() divider = false;

  context: MenuItemContext = new MenuItemContext();

  private active: boolean;

  constructor(@Optional() public template: TemplateRef<MenuItemContext>) {
  }

  setNotActive() {
    this.active = false;
    if (this.subMenu) {
      this.subMenu.setNotActive();
    }
  }

  setActive() {
    this.active = true;
  }
}
