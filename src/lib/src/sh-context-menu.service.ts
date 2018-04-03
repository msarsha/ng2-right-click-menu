import {ComponentRef, ElementRef, Injectable, OnDestroy} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';
import {CloseScrollStrategy, Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ConnectedPositionStrategy} from '@angular/cdk/overlay/typings/position/connected-position-strategy';
import {ContextMenuEvent, ContextSubMenuEvent} from './sh-context-menu.models';
import {OverlayRef} from '@angular/cdk/overlay';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {Subscription} from 'rxjs/Subscription';
import {merge} from 'rxjs/observable/merge';

@Injectable()
export class ShContextMenuService implements OnDestroy {
  openOverlays: OverlayRef[] = [];
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

    const {overlayRef, componentRef} = this.createAndAttachOverlay(positionStrategy, scrollStrategy);

    this.setupComponentBindings(componentRef, menu, data);
    componentRef.instance.show(data);

    this.openOverlays.push(overlayRef);

    this.registerBackdropEvents(overlayRef);
  }

  openSubMenu(ctxEvent: ContextSubMenuEvent) {
    const {menu, mouseEvent, targetElement, data} = ctxEvent;

    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();

    const scrollStrategy = this.buildCloseScrollStrategy();
    const positionStrategy = this.buildConnectedPositionStrategyForSubMenu(targetElement);
    const {overlayRef, componentRef} = this.createAndAttachOverlay(positionStrategy, scrollStrategy, false);

    this.setupComponentBindings(componentRef, menu, data);
    componentRef.instance.show(data);
    this.openOverlays.push(overlayRef);
  }

  private registerBackdropEvents(overlayRef: OverlayRef) {
    const elm = overlayRef.backdropElement;

    this.backDropSub = fromEvent(elm, 'mousedown')
      .subscribe(this.closeCurrentOverlays.bind(this));
  }

  private setupComponentBindings(componentRef: ComponentRef<ShContextMenuComponent>,
                                 menu: ShContextMenuComponent, data: any) {
    componentRef.instance.viewChildrenItems = menu.viewChildrenItems;
    componentRef.instance.contentChildrenItems = menu.contentChildrenItems;
  }

  private createAndAttachOverlay(positionStrategy: ConnectedPositionStrategy,
                                 scrollStrategy: CloseScrollStrategy,
                                 hasBackdrop: boolean = true) {
    const overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: hasBackdrop,
      backdropClass: 'sh-backdrop'
    });

    const menuPortal = new ComponentPortal(ShContextMenuComponent);

    const componentRef: ComponentRef<ShContextMenuComponent> = overlayRef.attach(menuPortal);

    return {overlayRef, componentRef};
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
        {originX: 'end', originY: 'bottom'},
        {overlayX: 'start', overlayY: 'top'})
      .withFallbackPosition(
        {originX: 'start', originY: 'top'},
        {overlayX: 'start', overlayY: 'bottom'});
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
    this.openOverlays.forEach((o) => {
      o.detach();
      o.dispose();
    });

    this.openOverlays = [];
  }

  ngOnDestroy(): void {
    this.closeCurrentOverlays();
    this.backDropSub.unsubscribe();
  }
}
