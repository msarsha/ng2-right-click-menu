import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {ShContextMenuService} from './sh-context-menu.service';
import {ShContextMenuComponent} from './sh-context-menu.component';

@Directive({
  selector: '[shAnchorFor]'
})
export class ShAnchorForDirective implements OnInit {
  @Input('shAnchorFor')
  menu: ShContextMenuComponent;

  @Input('shMenuData') data: any;

  constructor(private ctxMenu: ShContextMenuService) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  @HostListener('contextmenu', ['$event'])
  openMenu(event: MouseEvent) {
    event.preventDefault();
    console.log(this.menu);
    this.ctxMenu.openMenu(this.menu, event);
  }
}
