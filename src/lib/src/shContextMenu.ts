import {
  AfterContentInit, Component, ContentChildren, Directive, Input, OnInit, TemplateRef, ViewChildren,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[shContextMenu]'
})
export class ShContextMenuDirective {
  @Input('shContextMenu') shContextMenu;

  constructor() {
    // console.log(this.data);
  }
}

@Directive({
  selector: '[shContextMenuItem]'
})
export class ShContextMenuItemDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

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
