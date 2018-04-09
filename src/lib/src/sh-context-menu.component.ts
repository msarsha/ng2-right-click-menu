import {
  Component, ContentChildren, ElementRef, Input, OnDestroy, QueryList, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {ShContextMenuItemDirective} from './sh-context-menu-item.directive';
import {ShContextMenuService} from './sh-context-menu.service';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'sh-context-menu',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['sh-context-menu.css'],
  template: `
    <div class="sh-context-menu" *ngIf="items.length">
      <div
        *ngFor="let item of items"
        #itemElement
        [ngClass]="{'sh-sub-anchor': item.subMenu, 'sh-context-menu--item__divider': item.divider}"
        class="sh-context-menu--item"
        (mouseenter)="onEnter($event, item, itemElement)"
        (mouseleave)="onLeave($event, item, itemElement)"
        (click)="onClick($event, item)">
        <ng-container *ngIf="!item.divider">
          <ng-content
            #itemCont
            *ngTemplateOutlet="item.template; context: item.context">
          </ng-content>
        </ng-container>
      </div>
    </div>
  `
})
export class ShContextMenuComponent implements OnDestroy {
  @Input() thisContext: any;

  @ContentChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) contentChildrenItems;
  @ViewChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) viewChildrenItems;

  items: ShContextMenuItemDirective[] = [];
  overlayRef: OverlayRef;
  isSub = false;

  constructor(private ctxService: ShContextMenuService) {
    this.contentChildrenItems = new QueryList<ShContextMenuItemDirective>();
    this.viewChildrenItems = new QueryList<ShContextMenuItemDirective>();
  }

  get menuItems(): QueryList<ShContextMenuItemDirective> {
    // when using the ShContextMenuComponent as menu, the ContentChildren is the source
    if (this.contentChildrenItems.length) {
      return this.contentChildrenItems;
    }

    // when using a custom component as menu the ViewChildren is the source
    return this.viewChildrenItems;
  }

  set menuItems(items: QueryList<ShContextMenuItemDirective>) {
    this.items = items.toArray();
  }

  show(data: any) {
    this.menuItems.forEach((item) => {
      item.context.$implicit = data;
    });

    this.menuItems = this.menuItems;
  }

  onEnter($event: MouseEvent, item: ShContextMenuItemDirective, elm: HTMLElement) {
    if (!item.subMenu) {
      // TODO: after small delay - close all child submenus if any
      return;
    }

    this.ctxService.openSubMenu({
      hostMenu: this,
      data: item.context.$implicit,
      targetElement: new ElementRef(elm),
      menu: item.subMenu,
      mouseEvent: $event
    });
  }

  onLeave($event: MouseEvent, item: ShContextMenuItemDirective, elm: HTMLElement) {

  }

  onClick($event: MouseEvent, item: ShContextMenuItemDirective) {
    // TODO: handle click in service

    if (item.divider) {
      return;
    }

    this.ctxService.destroy();

    if (item.on) {
      this.callWithContext(item.on, item, item.context.$implicit);
    }
  }

  private callWithContext(fn, fallbackContext, ...args) {
    fn.call(this.thisContext ? this.thisContext : fallbackContext, ...args);
  }

  ngOnDestroy(): void {
    // this.menuItems.forEach(i => i.open = false);
  }
}
