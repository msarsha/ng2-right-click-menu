import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShContextMenuComponent} from './sh-context-menu.component';
import {ShAnchorForDirective} from './sh-anchor-for.directive';
import {ShContextMenuService} from './sh-context-menu.service';
import {ShContextMenuItemDirective} from './sh-context-menu-item.directive';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    ShAnchorForDirective,
    ShContextMenuComponent,
    ShContextMenuItemDirective,
  ],
  exports: [
    ShAnchorForDirective,
    ShContextMenuComponent,
    ShContextMenuItemDirective,
  ],
  providers: [
    ShContextMenuService
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  entryComponents: [
    ShContextMenuComponent
  ]
})
export class ShContextMenuModule {
}
