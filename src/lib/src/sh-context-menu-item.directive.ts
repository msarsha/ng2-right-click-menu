import {Directive, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';

@Directive({
  selector: '[shContextMenuItem]'
})
export class ShContextMenuItemDirective {
  @Input('shContextMenuItemWith') subMenu: ShContextMenuComponent;
  @Input('shContextMenuItemDivider') divider = false;

  constructor(public template: TemplateRef<any>) {
  }
}
