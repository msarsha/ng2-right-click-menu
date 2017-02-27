import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShContextMenuDirective } from "./sh-context-menu.directive";
import { ShContextMenuItem } from "./sh-context-item.component";
import { ShContextMenuComponent } from './sh-context-menu.component';

@NgModule({
  declarations: [ShContextMenuDirective, ShContextMenuComponent, ShContextMenuItem],
  exports: [ShContextMenuDirective],
  imports: [CommonModule],
  entryComponents: [ShContextMenuComponent]
})
export class ShContextMenuModule{}
