import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { ShContextMenuComponent } from './sh-context-menu.component';
import {
	ConnectionPositionPair,
	FlexibleConnectedPositionStrategy,
	GlobalPositionStrategy,
	Overlay,
	ScrollStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
	ShContextMenuEvent,
	ShContextSubMenuEvent
} from './sh-context-menu.models';
import { OverlayRef } from '@angular/cdk/overlay';
import { fromEvent, Subscription } from 'rxjs';

@Injectable()
export class ShContextMenuService implements OnDestroy {
	activeOverlays: OverlayRef[] = [];
	subs: Subscription;
	activeMenu: ShContextMenuComponent;
	anchorElement: HTMLElement;

	constructor(private overlay: Overlay) {}

	openMenu(ctxEvent: ShContextMenuEvent) {
		this.closeCurrentOverlays();
		const { menu, mouseEvent, data } = ctxEvent;

		this.activeMenu = menu;

		this.anchorElement = this.createAnchorElement();
		const scrollStrategy = this.buildScrollStrategy();
		const positionStrategy = this.buildPositionStrategy(
			this.anchorElement,
			mouseEvent
		);

		this.attachContextToItems(menu, data);

		const overlayRef = this.createAndAttachOverlay(
			positionStrategy,
			scrollStrategy,
			menu,
			true
		);
		this.attachOverlayRef(menu, overlayRef);

		this.registerDetachEvents(overlayRef);
	}

	openSubMenu(ctxEvent: ShContextSubMenuEvent): any {
		const { menu, mouseEvent, targetElement, data, parentMenu } = ctxEvent;

		mouseEvent.preventDefault();
		mouseEvent.stopPropagation();

		const scrollStrategy = this.buildScrollStrategy();
		const positionStrategy = this.buildPositionStrategyForSubMenu(
			targetElement
		);
		const overlayRef = this.createAndAttachOverlay(
			positionStrategy,
			scrollStrategy,
			menu,
			false
		);

		this.attachContextToItems(menu, data);
		this.attachThisContext(menu, parentMenu);
		this.attachOverlayRef(menu, overlayRef);
	}

	destroy() {
		this.closeCurrentOverlays();
		this.subs.unsubscribe();
	}

	ngOnDestroy(): void {
		this.destroy();
	}

	closeSubMenus(menu: ShContextMenuComponent) {
		const itemsWithSubMenus = menu.menuItems.filter(
			i => !!i.subMenu && !!i.subMenu.overlayRef
		);

		if (itemsWithSubMenus.length) {
			itemsWithSubMenus.forEach(sm => this.closeSubMenus(sm.subMenu));

			const overlayRefs = itemsWithSubMenus.map(i => i.subMenu.overlayRef);

			overlayRefs.forEach(r => r.dispose());
		}
	}

	private registerDetachEvents(overlayRef: OverlayRef) {
		this.subs = overlayRef
			.backdropClick()
			.subscribe(this.closeCurrentOverlays.bind(this));
		this.subs.add(
			overlayRef.detachments().subscribe(this.closeCurrentOverlays.bind(this))
		);
	}

	private createAndAttachOverlay(
		positionStrategy:
			| GlobalPositionStrategy
			| FlexibleConnectedPositionStrategy,
		scrollStrategy: ScrollStrategy,
		menu: ShContextMenuComponent,
		hasBackdrop: boolean = true
	) {
		const overlayRef = this.overlay.create({
			positionStrategy,
			scrollStrategy,
			hasBackdrop: hasBackdrop,
			backdropClass: 'sh-backdrop'
		});

		/*
     TODO: try passing the TemplatePortal context (data)
     and then injecting it to the *ngTemplateOutlet in the component template
    */
		const menuPortal = new TemplatePortal(
			menu.menuTemplate,
			menu.menuContainer
		);
		overlayRef.attach(menuPortal);

		this.activeOverlays.push(overlayRef);

		return overlayRef;
	}

	private buildScrollStrategy(): ScrollStrategy {
		return this.overlay.scrollStrategies.reposition({ autoClose: true });
	}

	private buildPositionStrategy(
		ele: HTMLElement,
		event: MouseEvent
	): FlexibleConnectedPositionStrategy {
		const { x, y } = event;

		return this.overlay
			.position()
			.flexibleConnectedTo(ele)
			.withDefaultOffsetX(x)
			.withDefaultOffsetY(y)
			.withPositions(this.buildPositions())
			.withFlexibleDimensions(false)
			.withPush(true);
	}

	private buildPositionStrategyForSubMenu(
		elm: ElementRef
	): FlexibleConnectedPositionStrategy {
		return this.overlay
			.position()
			.flexibleConnectedTo(elm)
			.withPositions(this.buildSubMenuPositions())
			.withFlexibleDimensions(false)
			.withPush(true);
	}

	private closeCurrentOverlays() {
		if (this.anchorElement) {
			this.anchorElement.remove();
		}

		this.activeOverlays.forEach(o => {
			o.detach();
			o.dispose();
		});

		this.activeOverlays = [];

		// TODO: create close subject and emit.
		// subscribe in component
		if (this.activeMenu) {
			this.activeMenu.close();
		}
	}

	private attachContextToItems(menu: ShContextMenuComponent, data: any) {
		menu.menuItems.forEach(i => (i.context.$implicit = data));
	}

	private attachThisContext(
		menu: ShContextMenuComponent,
		parentMenu: ShContextMenuComponent
	) {
		menu.thisContext = parentMenu.thisContext;
	}

	private attachOverlayRef(
		menu: ShContextMenuComponent,
		overlayRef: OverlayRef
	) {
		menu.overlayRef = overlayRef;
	}

	private createAnchorElement(): HTMLElement {
		const div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.bottom = '0';
		div.style.left = '0';
		div.style.right = '0';

		document.body.appendChild(div);

		return div;
	}

	private buildSubMenuPositions(): ConnectionPositionPair[] {
		return [
			{
				originX: 'end',
				originY: 'top',
				overlayX: 'start',
				overlayY: 'top'
			},
			{
				originX: 'start',
				originY: 'top',
				overlayX: 'end',
				overlayY: 'top'
			},
			{
				originX: 'end',
				originY: 'bottom',
				overlayX: 'start',
				overlayY: 'bottom'
			},
			{
				originX: 'start',
				originY: 'bottom',
				overlayX: 'end',
				overlayY: 'bottom'
			}
		];
	}

	private buildPositions(): ConnectionPositionPair[] {
		return [
			{
				originX: 'start',
				originY: 'top',
				overlayX: 'start',
				overlayY: 'top'
			},
			{
				originX: 'start',
				originY: 'top',
				overlayX: 'end',
				overlayY: 'top'
			},
			{
				originX: 'start',
				originY: 'top',
				overlayX: 'start',
				overlayY: 'bottom'
			},
			{
				originX: 'start',
				originY: 'top',
				overlayX: 'end',
				overlayY: 'bottom'
			}
		];
	}
}
