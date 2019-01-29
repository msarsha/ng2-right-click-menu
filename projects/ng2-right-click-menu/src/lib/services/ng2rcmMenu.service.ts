import { Injectable, Injector, TemplateRef } from '@angular/core';
import { Ng2rcmOverlayService } from './ng2rcmOverlay.service';
import { MenuDirective } from '../directives/menu.directive';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { MenuComponent } from '../components/menu/menu.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { ContextMenuRef } from '../interfaces';

export interface Ng2rcmMenuOptions {
	event: MouseEvent;
	menu: MenuDirective;
	data?: any;
}

@Injectable({
	providedIn: 'root'
})
export class Ng2rcmMenuService {
	constructor(
		private menuOverlay: Ng2rcmOverlayService,
		private injector: Injector
	) {}

	open(options: Ng2rcmMenuOptions) {
		const { event, menu } = options;

		const menuOverlayRef = this.menuOverlay.create(event);

		this.attachDestroyEvents(menuOverlayRef);

		const menuRef = new ContextMenuRef(menu.templateRef, menuOverlayRef);
		const menuInjector = this.createInjector(menuRef, this.injector);
		const portal = new ComponentPortal(MenuComponent, menu.vcRef, menuInjector);

		menuOverlayRef.attach(portal);
	}

	private attachDestroyEvents(menuOverlayRef: OverlayRef) {
		menuOverlayRef.backdropClick().subscribe(() => {
			menuOverlayRef.detach();
		});
	}

	private createInjector(menuRef: ContextMenuRef, injector: Injector) {
		const tokens = new WeakMap([[ContextMenuRef, menuRef]]);
		return new PortalInjector(injector, tokens);
	}
}
