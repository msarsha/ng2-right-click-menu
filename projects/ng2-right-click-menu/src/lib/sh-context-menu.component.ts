import {
  Component, ContentChildren, ElementRef, Input, OnDestroy, QueryList, TemplateRef, ViewChild, ViewChildren,
  ViewContainerRef,
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
    <ng-container #menuContainer></ng-container>
    <ng-template #menuTemplate>
      <div class="sh-context-menu">
        <div
          *ngFor="let menuItem of menuItems"
          #itemElement
          [ngClass]="{'sh-sub-anchor': menuItem.subMenu,
           'sh-context-menu--item__divider': menuItem.divider,
           'sh-context-menu--item__sub-active': subActive && menuItem.active}"
          class="sh-context-menu--item"
          (mouseenter)="onEnter($event, menuItem, itemElement)"
          (click)="onClick($event, menuItem)">
          <ng-container *ngIf="!menuItem.divider || !isVisible(menuItem)">
            <ng-content *ngTemplateOutlet="menuItem.template; context: menuItem.context"></ng-content>
          </ng-container>
        </div>
      </div>
    </ng-template>
  `
})
export class ShContextMenuComponent implements OnDestroy {
  @Input('this') thisContext: any;

  @ContentChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) contentChildrenItems;
  @ViewChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) viewChildrenItems;

  @ViewChild('menuTemplate', {read: TemplateRef}) menuTemplate;
  @ViewChild('menuContainer', {read: ViewContainerRef}) menuContainer;

  public overlayRef: OverlayRef;
  subActive: boolean;

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

  onEnter($event: MouseEvent, item: ShContextMenuItemDirective, elm: HTMLElement) {
    this.ctxService.closeSubMenus(this);
    this.setNotActive();

    if (!item.subMenu) {
      return;
    }

    this.setActive(item);
    this.ctxService.openSubMenu({
      data: item.context.$implicit,
      targetElement: new ElementRef(elm),
      menu: item.subMenu,
      mouseEvent: $event,
      parentMenu: this
    });
  }

  private setActive(item: ShContextMenuItemDirective) {
    item.setActive();
    this.subActive = true;
  }

  onClick(event: MouseEvent, item: ShContextMenuItemDirective) {
    // TODO: move click handling to service

    if (item.divider) {
      return;
    }

    if (!item.subMenu && item.closeOnClick) {
      this.ctxService.destroy();

      item.click.emit({
        data: item.context.$implicit,
        event
      });
    }
  }

  private callWithContext(fn, fallbackContext, data, event) {
    return fn.call(this.thisContext ? this.thisContext : fallbackContext, {data, event});
  }

  close(): void {
    this.setNotActive();
    this.menuContainer.detach();
    if(this.overlayRef) {
       this.overlayRef.detach();
    }
  }

  ngOnDestroy(): void {
    this.close();
  }

  setNotActive() {
    this.subActive = false;
    this.menuItems.forEach(i => i.setNotActive());
  }

  isVisible(item: ShContextMenuItemDirective) {
    if (!item.visible) {
      return true;
    }

    return this.callWithContext(item.visible, this, item.context.$implicit, null);
  }
}
