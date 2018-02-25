import {ComponentRef, ElementRef, Injectable} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ConnectedPositionStrategy} from '@angular/cdk/overlay/typings/position/connected-position-strategy';
import {ContextMenuEvent} from './sh-context-menu.models';
import {OverlayRef} from '@angular/cdk/overlay/typings/overlay-ref';

@Injectable()
export class ShContextMenuService {

  openOverlays: OverlayRef[] = [];

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

    const overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy
    });

    const menuPortal = new ComponentPortal(ShContextMenuComponent);
    const componentRef: ComponentRef<ShContextMenuComponent> = overlayRef.attach(menuPortal);

    componentRef.instance.viewChildrenItems = menu.viewChildrenItems;
    componentRef.instance.contentChildrenItems = menu.contentChildrenItems;

    componentRef.instance.show(data);

    this.openOverlays.push(overlayRef);
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
}
