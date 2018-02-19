import {
  AfterContentInit, Component, ContentChildren, OnInit, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {ShContextMenuItemDirective} from './sh-context-menu-item.directive';

@Component({
  selector: 'sh-context-menu',
  template: `
    <ng-content></ng-content>`
})
export class ShContextMenuComponent implements OnInit, AfterContentInit {

  @ContentChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) items;
  @ViewChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) viewChildrenItems;

  constructor(private vcr: ViewContainerRef) {
  }

  ngAfterContentInit(): void {
    console.log(this.items);
  }

  ngOnInit() {
  }

  show() {
    if (this.items.length) {
      this.showMenu(this.items);
    }
    if (this.viewChildrenItems.length) {
      this.showMenu(this.viewChildrenItems);
    }
  }

  private showMenu(items: ShContextMenuItemDirective[]) {
    items
      .forEach(
        item => this.vcr.createEmbeddedView(item.template, {
          $implicit: {label: 'testtt'}
        })
      );
  }
}
