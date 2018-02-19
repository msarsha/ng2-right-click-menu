import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {ShContextMenuService} from './shContextMenu.service';
import {ShContextMenuComponent} from './shContextMenu';

@Directive({
  selector: '[shContextMenuTriggerFor]'
})
export class ShContextMenuTriggerDirective implements OnInit {
  @Input('shContextMenuTriggerFor')
  triggerFor: ShContextMenuComponent;

  @Input('shMenuData') data: any;

  constructor(private ctxMenu: ShContextMenuService) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  @HostListener('contextmenu', ['$event'])
  openMenu(event: MouseEvent) {
    event.preventDefault();
    console.log(this.triggerFor);
    this.ctxMenu.openMenu(this.triggerFor, event);
  }
}
