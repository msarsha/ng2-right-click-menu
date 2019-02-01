import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ng2rcmMenuService } from '../../services/ng2rcmMenu.service';

export interface MenuCloseEvent {
	event: MouseEvent;
	preventClose: () => void;
}

@Component({
	selector: 'ng2rcm-menu-item',
	templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
	@Output() click = new EventEmitter<MenuCloseEvent>();

	@Input() closeOnClick = true;

	constructor(private service: Ng2rcmMenuService) {}

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
