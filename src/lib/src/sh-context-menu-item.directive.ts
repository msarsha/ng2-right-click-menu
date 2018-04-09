import {Directive, Input, Optional, TemplateRef} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';

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
  @Input('shContextMenuItemOn') on: (data) => {};
  @Input() divider = false;

  context: MenuItemContext = new MenuItemContext();

  constructor(@Optional() public template: TemplateRef<MenuItemContext>) {
  }
}
