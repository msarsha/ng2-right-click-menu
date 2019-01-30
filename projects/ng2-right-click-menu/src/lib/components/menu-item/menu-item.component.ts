import { Component, Injector, Input } from '@angular/core';

@Component({
	selector: 'ng2rcm-menu-item',
	templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
	@Input() data: any;

	constructor() {}
}
