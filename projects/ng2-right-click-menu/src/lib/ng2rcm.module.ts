import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorDirective } from './directives/anchor.directive';
import { MenuDirective } from './directives/menu.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuComponent } from './components/menu.component';

@NgModule({
	imports: [CommonModule, OverlayModule],
	declarations: [AnchorDirective, MenuDirective, MenuComponent],
	providers: [],
	exports: [AnchorDirective, MenuDirective],
	entryComponents: [MenuComponent]
})
export class Ng2rcmModule {}
