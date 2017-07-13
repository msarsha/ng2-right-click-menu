import { ShContextService } from './sh-context-service';
import { Directive, Input, HostListener, ViewContainerRef, OnInit, ComponentFactoryResolver, ComponentRef, ElementRef } from "@angular/core";

import { ShContextOverlayComponent } from './sh-context-overlay.component';
import { IShContextMenuItem } from "./sh-context-item";
import { ShContextMenuComponent, ShContextPosition } from "./sh-context-menu.component";
import { IShContextOptions } from './sh-context-options';

@Directive({
  selector: '[sh-context]'
})
export class ShContextMenuDirective {
  @Input('sh-context') menuItems: IShContextMenuItem[];
  @Input('sh-data-context') dataContext: any;
  @Input('sh-options') options: IShContextOptions;

  ctxComponent: ComponentRef<ShContextMenuComponent>;
  overlayComponent: ComponentRef<ShContextOverlayComponent>;

  constructor(
    private viewRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private ctxService: ShContextService
  ) { }

  @HostListener('contextmenu', ['$event'])
  onClick(event: MouseEvent) {
    this.options = this.ctxService.setOptions(this.options);

    this.closeMenu();
    this.ctxComponent = this.createContextComponent();
    this.overlayComponent = this.createOverlayComponent();

    this.registerBindings();
    this.registerEvents();
    this.setLocation(event);

    return false;
  }

  registerEvents() {
    this.ctxComponent.instance.onClose.subscribe(() => {
      this.closeMenu()
    });

    this.overlayComponent.instance.onClick.subscribe(() => { this.closeMenu() });
  }

  registerBindings() {
    this.ctxComponent.instance.items = this.menuItems;
    this.ctxComponent.instance.dataContext = this.dataContext;
  }

  createContextComponent(): ComponentRef<ShContextMenuComponent> {
    let shContextMenuFactory = this.resolver.resolveComponentFactory(ShContextMenuComponent);
    let shContextComponentRef = this.viewRef.createComponent(shContextMenuFactory);

    return shContextComponentRef;
  }

  createOverlayComponent(): ComponentRef<ShContextOverlayComponent> {
    let shContextOverlayFactory = this.resolver.resolveComponentFactory(ShContextOverlayComponent);
    let shContextOverlayRef = this.viewRef.createComponent(shContextOverlayFactory);

    return shContextOverlayRef;
  }

  setLocation(event: MouseEvent) {
    let htmlElem: HTMLElement|null = <HTMLElement>event.srcElement;
    let x, y: number;

    if (htmlElem) {
      x = htmlElem.offsetLeft + event.offsetX;
      y = htmlElem.offsetTop + event.offsetY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }

    let position: ShContextPosition = {
      top: y,
      left: x
    };

    this.ctxComponent.instance.position = position;
  }

  closeMenu() {
    this.viewRef.clear();
  }
}
