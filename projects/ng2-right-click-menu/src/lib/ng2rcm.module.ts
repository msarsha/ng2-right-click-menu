import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorDirective } from './directives/anchor.directive';
import { MenuDirective } from './directives/menu.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenuWrapperComponent } from './components/menu-wrapper/menu-wrapper.component';
import { MenuItemDirective } from './directives/menuItem.directive';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
	imports: [CommonModule, OverlayModule],
	declarations: [
		AnchorDirective,
		MenuDirective,
		MenuItemComponent,
		MenuWrapperComponent,
		MenuItemDirective,
		MenuComponent
	],
	providers: [],
	exports: [
		AnchorDirective,
		MenuItemComponent,
		MenuItemDirective,
		MenuComponent
	],
	entryComponents: [MenuWrapperComponent]
})
export class Ng2rcmModule {}
