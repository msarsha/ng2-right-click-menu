import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, OnInit, QueryList, ViewChildren,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {ShContextMenuItemDirective} from './sh-context-menu-item.directive';

class ContextMenuItemWithData extends ShContextMenuItemDirective {
  context: {
    $implicit: any
  };
}

@Component({
  selector: 'sh-context-menu',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['overlay.css'],
  template: `
    <div class="sh-context-menu" *ngIf="items.length">
      <ng-container *ngFor="let item of items">
        <ng-content
          *ngTemplateOutlet="item.template; context: item.context">
        </ng-content>
      </ng-container>
    </div>
  `
})
export class ShContextMenuComponent {
  @ContentChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) contentChildrenItems = new QueryList<ShContextMenuItemDirective>();
  @ViewChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) viewChildrenItems = new QueryList<ShContextMenuItemDirective>();

  items: ContextMenuItemWithData[] = [];

  show(data: any) {
    // when using the ShContextMenuComponent as menu, the ContentChildren is the source
    if (this.contentChildrenItems.length) {
      this.showMenu(this.contentChildrenItems, data);
    }

    // when using a custom component as menu the ViewChildren is the source
    if (this.viewChildrenItems.length) {
      this.showMenu(this.viewChildrenItems, data);
    }
  }

  private showMenu(items: QueryList<ShContextMenuItemDirective>, data: any) {
    this.items = items.map((item) => {
      return {...item, context: {$implicit: data}};
    });
  }
}

