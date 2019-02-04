import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ng2rcmMenuService } from '../../services/ng2rcmMenu.service';
import { MenuComponent } from '../menu/menu.component';

export interface MenuClickEvent {
	event: MouseEvent;
	preventClose: () => void;
}

@Component({
	selector: 'ng2rcm-menu-item',
	templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
	@Output() click = new EventEmitter<MenuClickEvent>();

	@Input() closeOnClick = true;

	constructor(
		private service: Ng2rcmMenuService,
		private menu: MenuComponent
	) {}

	onClick($event: MouseEvent) {
		$event.stopPropagation();
		let closePrevented = false;

		this.click.emit({
			event: $event,
			preventClose: () => {
				closePrevented = true;
			}
		});

		if (!closePrevented) {
			this.service.close($event);
		}
	}
}
