import {
  Component, ContentChildren, ElementRef, QueryList, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {ShContextMenuItemDirective} from './sh-context-menu-item.directive';
import {ShContextMenuService} from './sh-context-menu.service';

class ContextMenuItemWithData extends ShContextMenuItemDirective {
  context: {
    $implicit: any
  };
  open: boolean;
}

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
        (mouseleave)="onLeave($event, item, itemElement)">
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
export class ShContextMenuComponent {
  @ContentChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) contentChildrenItems;
  @ViewChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) viewChildrenItems;

  items: ContextMenuItemWithData[] = [];

  constructor(private ctxService: ShContextMenuService) {
    this.contentChildrenItems = new QueryList<ContextMenuItemWithData>();
    this.viewChildrenItems = new QueryList<ContextMenuItemWithData>();
  }

  get menuItems() {
    // when using the ShContextMenuComponent as menu, the ContentChildren is the source
    if (this.contentChildrenItems.length) {
      return this.contentChildrenItems;
    }

    // when using a custom component as menu the ViewChildren is the source
    return this.viewChildrenItems;
  }

  set menuItems(items: ContextMenuItemWithData[]) {
    this.items = [].concat(items);
  }

  show(data: any) {
    this.menuItems = this.menuItems.map(this.mapItems(data));
  }

  private mapItems(data) {
    return (item) => {
      return {...item, context: {$implicit: data}};
    };
  }

  onEnter($event: MouseEvent, item: ContextMenuItemWithData, elm: HTMLElement) {
    if (!item.subMenu) {
      // after small delay - close all child submenus if any
      return;
    }

    if (!item.open) {
      item.open = true;
      this.ctxService.openSubMenu({
        hostMenu: this,
        data: item.context.$implicit,
        targetElement: new ElementRef(elm),
        menu: item.subMenu,
        mouseEvent: $event
      });
    }
  }

  onLeave($event: MouseEvent, item: ContextMenuItemWithData, elm: HTMLElement) {

  }
}
