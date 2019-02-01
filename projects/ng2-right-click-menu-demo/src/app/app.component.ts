import { Component, ViewEncapsulation } from '@angular/core';
import { MenuCloseEvent } from '../../../ng2-right-click-menu/src/lib/components/menu-item/menu-item.component';

@Component({
	selector: 'app-root',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	items: any[];

	constructor() {
		this.items = [
			{
				label: 'Item One'
			},
			{
				label: 'Item Two'
			}
		];
	}

	onClick(event: MenuCloseEvent, data) {
		console.log('clicked', event, data);
	}

	isVisible(event) {
		return true;
	}

	onOpen($event) {}

	open($event: MouseEvent, item: any) {}
}
