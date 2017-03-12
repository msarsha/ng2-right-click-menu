import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShContextOverlayComponent } from './sh-context-overlay.component';
import { ShContextMenuDirective } from "./sh-context-menu.directive";
import { ShContextMenuComponent } from './sh-context-menu.component';
import { ShContextSubMenuDirective } from './sh-context-sub-menu.directive';
import { ShContextServiceModule } from './sh-context-service';

@NgModule({
  declarations: [
    ShContextMenuDirective,
    ShContextMenuComponent,
    ShContextSubMenuDirective,
    ShContextOverlayComponent
  ],
  exports: [ShContextMenuDirective],
  imports: [
    CommonModule,
    ShContextServiceModule
  ],
  entryComponents: [
    ShContextMenuComponent,
    ShContextOverlayComponent
  ]
})
export class ShContextMenuModule { }
