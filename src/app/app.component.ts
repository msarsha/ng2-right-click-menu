import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ShContextMenuComponent} from '../lib/src/sh-context-menu.component';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Right Click Me';
  items: any[];

  thisContext = this;

  constructor() {
    this.items = [
      {
        label: 'Item One'
      },
      {
        label: 'Item Two'
      }
    ];
  }

  onClick(item) {
    console.log('clicked', this);
  }
}

@Component({
  selector: 'my-menu',
  template: `
    <div *shContextMenuItem="let item">
      from comp !! - {{item.label}}
    </div>
    <div *shContextMenuItem="let item">
      from comp !! - {{item.label}}
    </div>
    <!--<div *shContextMenuItem="let item; subMenu: subMenu">-->
    <!--from comp !! - {{item.label}}-->
    <!--</div>-->
    <!--<sh-context-menu #subMenu>-->
    <!--<div *shContextMenuItem="let item;">-->
    <!--From Sub Menu - {{item.label}}-->
    <!--</div>-->
    <!--</sh-context-menu>-->
  `
})
export class MyMenuComponent extends ShContextMenuComponent {
}

@Component({
  selector: 'my-content',
  template: `
    <div class="box">
      <input type="text" [value]="item.label">
    </div>
  `
})
export class MyContentComponent {
  @Input() item: any;
}
