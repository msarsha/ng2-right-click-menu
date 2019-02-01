import {
	Injectable,
	Injector,
	TemplateRef,
	ViewContainerRef
} from '@angular/core';
import { Ng2rcmOverlayService } from './ng2rcmOverlay.service';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { MenuComponent } from '../components/menu/menu.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { ContextMenuRef } from '../interfaces';
import { MenuWrapperComponent } from '../components/menu-wrapper/menu-wrapper.component';

export interface Ng2rcmMenuOptions {
	event: MouseEvent;
	menu?: TemplateRef<any>;
	vcRef?: ViewContainerRef;
	data?: any;
}

@Injectable({
	providedIn: 'root'
})
export class Ng2rcmMenuService {
	private _menuRef: ContextMenuRef;

	constructor(
		private menuOverlay: Ng2rcmOverlayService,
		private injector: Injector
	) {}

	open(options: Ng2rcmMenuOptions) {
		const { event, menu, data, vcRef } = options;

		const menuOverlayRef = this.menuOverlay.create(event);

		this.attachDestroyEvents(menuOverlayRef);
		this._menuRef = new ContextMenuRef(menu, menuOverlayRef, data);
		const menuInjector = this.createInjector(this._menuRef, this.injector);

		const portal = new ComponentPortal(
			MenuWrapperComponent,
			null,
			menuInjector
		);

		menuOverlayRef.attach(portal);
	}

	close($event: MouseEvent) {
		if (this._menuRef) {
			this._menuRef.overlayRef.dispose();
		}
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
