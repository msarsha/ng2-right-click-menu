import { ShContextService } from './sh-context-service';
import { IShContextOptions } from './sh-context-options';
import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, ElementRef, AfterViewInit, ViewChild, AfterContentInit } from "@angular/core";

import { IShContextMenuItem } from "./sh-context-item";

export interface ShContextPosition {
  top: number;
  left: number;
}

@Component({
  selector: 'sh-context-menu',
  template: `
    <div #childRef class="sh-context--container"
      [class.dark]="options.theme == 'dark'"
      [style.left]="position.left + 'px'"
      [style.top]="position.top + 'px'"
      [style.direction]="(options.rtl ? 'rtl' : 'ltr' )">
      <ul>
          <li *ngFor="let item of items"
            [ngClass]="{'sh-menu-item': !item.divider, 'sh-context-divider': item.divider, 'sh-menu-disabled': isItemDisabled(item), 'sh-menu-hidden': !isItemVisible(item)}"
            (click)="onClick(item)">
              <div *ngIf="!item.divider && !item.subMenu" [sh-html]="item.label">
              </div> 
              <div *ngIf="item.subMenu"
                [sh-context-sub-menu]="item.subMenuItems"
                [sh-data-context]="dataContext"
                (closeSubMenu)="close()"
                [sh-html]="item.label">
               <div [ngClass]="{'right-arrow': !options.rtl, 'left-arrow': options.rtl}"></div>
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
  .dark{
      background:#383737 !important;
      color:white !important;
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
      border-bottom: 1px solid #d0d0d0;
      line-height: 10px;
    }

  .sh-context--container ul li.sh-menu-item:hover{
      cursor: pointer;
      background: #4b8bec;
      color: white;
  }
 
   .sh-context--container.dark ul li.sh-menu-item:hover{
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

  .right-arrow{
    float: right;
    margin-left: 10px;
    margin-top: 3px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid black;
  }

  .left-arrow{
    float: left;
    margin-right: 10px;
    margin-top: 3px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 8px solid black;
  }
`]
})
export class ShContextMenuComponent implements OnInit, AfterContentInit {
  @Input() position: ShContextPosition;
  @Input() items: IShContextMenuItem[];
  @Input() dataContext: any;
  @Output() onClose = new EventEmitter();

  options: IShContextOptions;

  @ViewChild('childRef') childRef: ElementRef;

  constructor(
    private ctxService: ShContextService
  ) { }

  ngOnInit(): void {
    this.options = this.ctxService.getOptions();
  }

  ngAfterContentInit(): void {
    if (this.options.rtl)
      this.setRtlLocation();
  }

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

  setRtlLocation() {
    const elmRect: ClientRect =
      this.childRef.nativeElement.getClientRects()[0];

    this.position.left = this.position.left - elmRect.width;
  }
}
