import {Directive, Input, OnInit, TemplateRef} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';

@Directive({
  selector: '[shContextMenuItem]'
})
export class ShContextMenuItemDirective implements OnInit {
  @Input('shContextMenuItemSubMenu') subMenu: ShContextMenuComponent;

  constructor(public template: TemplateRef<any>) {
  }

  ngOnInit(): void {
    console.log(this.subMenu);
  }
}
