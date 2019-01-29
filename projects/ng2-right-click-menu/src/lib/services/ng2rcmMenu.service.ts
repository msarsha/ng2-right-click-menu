import { Injectable } from '@angular/core';
import { Ng2rcmOverlayService } from './ng2rcmOverlay.service';
import { MenuDirective } from '../directives/menu.directive';
import { ComponentPortal } from '@angular/cdk/portal';
import { MenuComponent } from '../components/menu.component';

export interface Ng2rcmMenuOptions {
	event: MouseEvent;
	menu: MenuDirective;
	data?: any;
}

@Injectable({
	providedIn: 'root'
})
export class Ng2rcmMenuService {
	constructor(private menuOverlay: Ng2rcmOverlayService) {}

	open(options: Ng2rcmMenuOptions) {
		const { event } = options;

		const menuOverlayRef = this.menuOverlay.create(event);

		menuOverlayRef.backdropClick().subscribe(() => {
			menuOverlayRef.detach();
		});

		const portal = new ComponentPortal(MenuComponent);

		menuOverlayRef.attach(portal);
	}
}
