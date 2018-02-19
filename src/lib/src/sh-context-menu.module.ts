import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShContextMenuComponent, ShContextMenuDirective, ShContextMenuItemDirective} from './shContextMenu';
import {ShContextMenuTriggerDirective} from './shContextMenuTrigger.directive';
import {ShContextMenuService} from './shContextMenu.service';

@NgModule({
  declarations: [
    ShContextMenuTriggerDirective,
    ShContextMenuDirective,
    ShContextMenuComponent,
    ShContextMenuItemDirective
  ],
  exports: [
    ShContextMenuTriggerDirective,
    ShContextMenuDirective,
    ShContextMenuComponent,
    ShContextMenuItemDirective
  ],
  providers: [
    ShContextMenuService
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
  ]
})
export class ShContextMenuModule {
}
