import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnchorDirective} from './directives/anchor.directive';
import {MenuDirective} from './directives/menu.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AnchorDirective, MenuDirective],
  providers: [],
  exports: [AnchorDirective, MenuDirective]
})
export class Ng2rcmModule {
}
