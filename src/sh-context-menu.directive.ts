import { ShContextOverlayComponent } from './sh-context-overlay.component';
import { Directive, Input, HostListener, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from "@angular/core";
import { IShContextMenuItem } from "./sh-context-item";
import { ShContextMenuComponent, CtxPosition } from "./sh-context-menu.component";

@Directive({
  selector: '[sh-context]'
})
export class ShContextMenuDirective {
  @Input('sh-context') menuItems: IShContextMenuItem[];
  @Input('sh-data-context') dataContext: any;

  ctxComponent: ComponentRef<ShContextMenuComponent>;
  overlayComponent: ComponentRef<ShContextOverlayComponent>;

  constructor(
    private viewRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }

  @HostListener('contextmenu', ['$event'])
  onClick(event: MouseEvent) {
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
    let position: CtxPosition = {
      top: event.clientY + 'px',
      left: event.clientX + 'px'
    };

    this.ctxComponent.instance.position = position;
  }

  closeMenu() {
    this.viewRef.clear();
  }
}
