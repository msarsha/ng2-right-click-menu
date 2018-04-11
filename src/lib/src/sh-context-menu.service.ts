import {ElementRef, Injectable, OnDestroy} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';
import {CloseScrollStrategy, Overlay} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {ConnectedPositionStrategy} from '@angular/cdk/overlay/typings/position/connected-position-strategy';
import {ContextMenuEvent, ContextSubMenuEvent} from './sh-context-menu.models';
import {OverlayRef} from '@angular/cdk/overlay';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class ShContextMenuService implements OnDestroy {
  activeOverlays: OverlayRef[] = [];
  backDropSub: Subscription;

  constructor(private overlay: Overlay) {
  }

  openMenu(ctxEvent: ContextMenuEvent) {
    this.closeCurrentOverlays();
    const {menu, mouseEvent, targetElement, data} = ctxEvent;

    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();

    this.overrideGetBoundingClientRect(targetElement, mouseEvent);

    const scrollStrategy = this.buildCloseScrollStrategy();
    const positionStrategy = this.buildConnectedPositionStrategy(targetElement);

    this.attachContextToItems(menu, data);

    const overlayRef = this.createAndAttachOverlay(positionStrategy, scrollStrategy, menu, true);
    this.activeOverlays.push(overlayRef);
    this.attachOverlayRef(menu, overlayRef);

    this.registerBackdropEvents(overlayRef);
  }

  openSubMenu(ctxEvent: ContextSubMenuEvent): any {
    const {menu, mouseEvent, targetElement, data, parentMenu} = ctxEvent;

    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();

    const scrollStrategy = this.buildCloseScrollStrategy();
    const positionStrategy = this.buildConnectedPositionStrategyForSubMenu(targetElement);
    const overlayRef = this.createAndAttachOverlay(positionStrategy, scrollStrategy, menu, false);

    this.attachContextToItems(menu, data);
    this.attachThisContext(menu, parentMenu);
    this.attachOverlayRef(menu, overlayRef);

    this.activeOverlays.push(overlayRef);
  }

  private registerBackdropEvents(overlayRef: OverlayRef) {
    const elm = overlayRef.backdropElement;

    this.backDropSub = fromEvent(elm, 'mousedown')
      .subscribe(this.closeCurrentOverlays.bind(this));
  }

  private createAndAttachOverlay(positionStrategy: ConnectedPositionStrategy,
                                 scrollStrategy: CloseScrollStrategy,
                                 menu: ShContextMenuComponent,
                                 hasBackdrop: boolean = true) {
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
    const menuPortal = new TemplatePortal(menu.cmpTemplate, menu.cmpContainer);
    overlayRef.attach(menuPortal);

    return overlayRef;
  }

  private buildCloseScrollStrategy() {
    return this.overlay.scrollStrategies.close();
  }

  private buildConnectedPositionStrategy(elm: ElementRef): ConnectedPositionStrategy {
    return this
      .overlay
      .position()
      .connectedTo(elm,
        {originX: 'start', originY: 'bottom'},
        {overlayX: 'start', overlayY: 'top'})
      .withFallbackPosition(
        {originX: 'start', originY: 'top'},
        {overlayX: 'start', overlayY: 'bottom'})
      .withFallbackPosition(
        {originX: 'end', originY: 'top'},
        {overlayX: 'start', overlayY: 'top'})
      .withFallbackPosition(
        {originX: 'start', originY: 'top'},
        {overlayX: 'end', overlayY: 'top'})
      .withFallbackPosition(
        {originX: 'end', originY: 'center'},
        {overlayX: 'start', overlayY: 'center'})
      .withFallbackPosition(
        {originX: 'start', originY: 'center'},
        {overlayX: 'end', overlayY: 'center'});
  }

  private buildConnectedPositionStrategyForSubMenu(elm: ElementRef): ConnectedPositionStrategy {
    return this
      .overlay
      .position()
      .connectedTo(elm,
        { originX: 'end', originY: 'top' },
        { overlayX: 'start', overlayY: 'top' })
      .withFallbackPosition(
        { originX: 'start', originY: 'top' },
        { overlayX: 'end', overlayY: 'top' })
      .withFallbackPosition(
        { originX: 'end', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'bottom' })
      .withFallbackPosition(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'end', overlayY: 'bottom' });
  }

  /*
    we need to override getBoundingClientRect() to return the position of the menu.
    this is done because @angular/cdk use this function internally to determine where the overlay should be positioned
    https://github.com/angular/material2/blob/master/src/cdk/overlay/position/connected-position-strategy.ts#L288
   */
  private overrideGetBoundingClientRect(elm: ElementRef, event: MouseEvent) {
    const {clientX, clientY} = event;

    elm.nativeElement.getBoundingClientRect = (): ClientRect => {
      return {
        bottom: clientY,
        height: 0,
        left: clientX,
        right: clientX,
        top: clientY,
        width: 0
      };
    };
  }

  private closeCurrentOverlays() {
    this.activeOverlays.forEach((o) => {
      o.detach();
      o.dispose();
    });

    this.activeOverlays = [];
  }

  destroy() {
    this.closeCurrentOverlays();
    this.backDropSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  closeSubMenus(menu: ShContextMenuComponent) {
    const itemsWithSubMenus = menu
      .menuItems
      .filter(i => !!i.subMenu && !!i.subMenu.overlayRef);

    if (itemsWithSubMenus.length) {
      itemsWithSubMenus.forEach(sm => this.closeSubMenus(sm.subMenu));

      const overlayRefs = itemsWithSubMenus
        .map(i => i.subMenu.overlayRef);

      overlayRefs.forEach(r => r.dispose());
    }
  }

  private attachContextToItems(menu: ShContextMenuComponent, data: any) {
    menu.menuItems.forEach(i => i.context.$implicit = data);
  }

  private attachThisContext(menu: ShContextMenuComponent, parentMenu: ShContextMenuComponent) {
    menu.thisContext = parentMenu.thisContext;
  }

  private attachOverlayRef(menu: ShContextMenuComponent, overlayRef: OverlayRef) {
    menu.overlayRef = overlayRef;
  }
}
