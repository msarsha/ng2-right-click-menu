import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, OnInit, QueryList, ViewChildren,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {ShContextMenuItemDirective} from './sh-context-menu-item.directive';

@Component({
  selector: 'sh-context-menu',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['overlay.css'],
  template: `
    <ng-content></ng-content>`
})
export class ShContextMenuComponent implements OnInit, AfterContentInit, AfterViewInit {

  @ContentChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) items = new QueryList<ShContextMenuItemDirective>();
  @ViewChildren(ShContextMenuItemDirective, {read: ShContextMenuItemDirective}) viewChildrenItems = new QueryList<ShContextMenuItemDirective>();

  constructor(public vcr: ViewContainerRef, public elm: ElementRef) {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    console.log('init');
  }

  show() {
    if (this.items.length) {
      this.showMenu(this.items);
    }
    if (this.viewChildrenItems.length) {
      this.showMenu(this.viewChildrenItems);
    }
  }

  private showMenu(items: QueryList<ShContextMenuItemDirective>) {
    console.log('changes');
    items
      .forEach(
        item => this.vcr.createEmbeddedView(item.template, {
          $implicit: {label: 'testtt'}
        })
      );
  }
}

