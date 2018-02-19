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
  titleRtl = 'Right Click Me (RTL)';
  items: any[];
  itemsRtl: any[];
  dataCtxOne: any;
  dataCtxTwo: any;
  options: any;

  menuKey = 'firstMenu';

  constructor() {
    this.dataCtxOne = {
      One: 'One'
    };

    this.dataCtxTwo = {
      Two: 'Two'
    };

    this.items = [
      {
        label: '<i class="fa fa-floppy-o menu-icon"></i> Save Me On Your HD',
        onClick: this.clickEvent,
      },
      {
        label: 'Edit',
        onClick: this.clickEvent
      },
      {
        label: '<i class="fa fa-home"></i> <b>Sub</b> Menu',
        subMenu: true,
        subMenuItems: [
          {
            label: 'Save',
            onClick: this.clickEvent
          },
          {
            label: 'Edit',
            onClick: this.clickEvent
          },
          {
            label: 'Another Sub Menu',
            subMenu: true,
            subMenuItems: [
              {
                label: 'Save',
                onClick: this.clickEvent
              },
              {
                label: 'Edit',
                onClick: this.clickEvent
              }]
          }
        ]
      },
      {
        divider: true
      },
      {
        label: 'Remove',
        disabled: ctx => {
          return ctx.Two === 'Two';
        },
        onClick: this.clickEvent
      },
      {
        label: 'Hidden',
        onClick: this.clickEvent,
        visible: ctx => {
          return ctx.One === 'One';
        }
      }
    ];

    this.itemsRtl = [
      {
        label: 'שמור',
        onClick: this.clickEvent
      },
      {
        label: 'ערוך',
        onClick: this.clickEvent
      },
      {
        label: 'תפריט נוסף',
        subMenu: true,
        subMenuItems: [
          {
            label: 'שמור',
            onClick: this.clickEvent
          },
          {
            label: 'ערוך',
            onClick: this.clickEvent
          },
          {
            label: 'עוד תפריט נוסף',
            subMenu: true,
            subMenuItems: [
              {
                label: 'שמור',
                onClick: this.clickEvent
              },
              {
                label: 'ערוך',
                onClick: this.clickEvent
              }]
          }
        ]
      }
    ];

    this.options = {
      rtl: true,
      theme: 'dark'
    };
  }

  onBefore = (event: any) => {
    console.log(event);
    event.open([event.items[0]]);
  };

  clickEvent = ($event: any) => {
    console.log('clicked ', $event);
  };
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
  `
})
export class MyMenuComponent extends ShContextMenuComponent {
  @Input() item: any;
}
