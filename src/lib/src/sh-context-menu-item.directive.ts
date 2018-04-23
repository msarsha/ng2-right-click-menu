import {Directive, EventEmitter, HostBinding, Input, Optional, Output, TemplateRef} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';
import {ShContextMenuClickEvent} from './sh-context-menu.models';

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
  @Input() subMenu: ShContextMenuComponent;
  @Input() divider: boolean;
  @Input() visible: (event: ShContextMenuClickEvent) => boolean;
  @Input() closeOnClick = true;

  @Output() click = new EventEmitter<ShContextMenuClickEvent>();

  context: MenuItemContext = new MenuItemContext();

  private _active: boolean;

  constructor(@Optional() public template: TemplateRef<MenuItemContext>) {
  }

  setNotActive() {
    this._active = false;
    if (this.subMenu) {
      this.subMenu.setNotActive();
    }
  }

  setActive() {
    this._active = true;
  }
}
