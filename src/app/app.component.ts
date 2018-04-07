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

  constructor() {
    this.items = [
      {
        label: 'text',
        onClick: this.clickEvent,
      },
      {
        label: 'Edit',
        onClick: this.clickEvent
      }
    ];
  }

  clickEvent = ($event: any) => {
    console.log('clicked ', $event);
  };

  onClick(evt) {
    console.log('clicked', evt);
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
