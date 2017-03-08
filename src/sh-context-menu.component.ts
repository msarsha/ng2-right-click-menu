import { Component, Input, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
import { IShContextMenuItem } from "./sh-context-item";

@Component({
  selector: 'sh-context-menu',
  template: `
    <div class="sh-context--container"
      [style.left]="position.left"
      [style.top]="position.top">
      <ul>
          <li *ngFor="let item of items"
            [ngClass]="{'sh-menu-item': !item.divider, 'sh-context-divider': item.divider, 'sh-menu-disabled': isItemDisabled(item), 'sh-menu-hidden': !isItemVisible(item)}"
            (click)="onClick(item)">
              <div *ngIf="!item.divider && !item.subMenu">
                  {{item.label}}
              </div>
              <div *ngIf="item.subMenu"
                [sh-context-sub-menu]="item.subMenuItems"
                [sh-data-context]="dataContext"
                (closeSubMenu)="close()">
                  {{item.label}} <span style="float: right;"> > </span>
              </div>
          </li>
      </ul>
    </div>
`,
  styles: [`
  .sh-context--container{
    font-family: sans-serif;
    position: fixed;
    background: #ececec;
    min-width: 150px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 3px;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);
    z-index: 100;
    color: black;
  }

  .sh-context--container ul{
    list-style: none;
    padding: 5px 0;
    margin: 0;
  }

  .sh-context--container ul li{
      padding: 5px 10px 5px 15px;
      transition: all 0.15s;
  }

  .sh-context--container ul li.sh-context-divider{
      height: 1px;
      margin: 1px 1px 8px 1px;
      overflow: hidden;
      background-color: #ececec;
      border-bottom: 1px solid #d0d0d0;
      line-height: 10px;
    }

  .sh-context--container ul li.sh-menu-item:hover{
      cursor: pointer;
      background: #4b8bec;
      color: white;
  }

  .sh-context--container ul li.sh-menu-disabled{
      color: #d0d0d0;
   }

   .sh-context--container ul li.sh-menu-item.sh-menu-hidden{
      display: none;
   }

  .sh-context--container ul li.sh-menu-disabled:hover{
      cursor: not-allowed;
      color: #d0d0d0;
      background: #ececec;
  }
`]
})
export class ShContextMenuComponent {
  @Input() position: CtxPosition;
  @Input() items: IShContextMenuItem[];
  @Input() dataContext: any;
  @Output() onClose = new EventEmitter();

  close() {
    this.onClose.emit();
  }

  onClick(item: IShContextMenuItem) {
    if (this.isItemDisabled(item))
      return;

    if (item.onClick) {
      item.onClick({
        menuItem: item,
        dataContext: this.dataContext
      });
      this.close()
    }
  }

  isItemDisabled(item: IShContextMenuItem) {
    if (!item.disabled)
      return false;

    return item.disabled(this.dataContext);
  }

  isItemVisible(item: IShContextMenuItem) {
    if (!item.visible)
      return true;

    return item.visible(this.dataContext);
  }
}

export interface CtxPosition {
  top: string;
  left: string;
}
