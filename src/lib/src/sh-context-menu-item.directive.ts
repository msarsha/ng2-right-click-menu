import {Directive, Input, OnInit, TemplateRef} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';

@Directive({
  selector: '[shContextMenuItem]'
})
export class ShContextMenuItemDirective {
  @Input('shContextMenuItemSubMenu') subMenu: ShContextMenuComponent;
  @Input('shContextMenuItemDivider') divider = false;

  constructor(public template: TemplateRef<any>) {
  }
}
