import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ShContextMenuComponent} from '../lib/src/sh-context-menu.component';
import {Observable} from 'rxjs/Observable';

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
  itemVisible = false;

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

  onClick(data) {
    console.log('clicked', this, data);
  }

  isVisible(data) {
    console.log('isVisible', this, data);
    return true;
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
// TODO: this is not possible now (because the use of TemplatePortal instead of ComponentPortal)
// should later define an interface for using a custom component as context menu
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
