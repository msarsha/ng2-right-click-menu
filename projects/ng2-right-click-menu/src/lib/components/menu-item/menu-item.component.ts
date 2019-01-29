import { Component, Input } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
	selector: 'ng2rcm-menu-item',
	templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
	@Input() data: any;

	constructor(public parent: MenuComponent) {
		console.log(parent);
	}
}
