import {Directive, Input, HostListener, ViewContainerRef, ComponentFactoryResolver, ComponentRef} from "@angular/core";
import {IShContextMenuItem} from "./sh-context-item";
import {ShContextMenuComponent, CtxPosition} from "./sh-context-menu.component";

@Directive({
  selector: '[sh-context-sub-menu]'
})
export class ShContextSubMenuDirective {
  @Input('sh-context-sub-menu') menuItems: IShContextMenuItem[];
  @Input('sh-data-context') dataContext: any;
  ctxComponent: ComponentRef<ShContextMenuComponent>;

  constructor(private viewRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver) {
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    this.closeMenu();
    this.ctxComponent = this.createContextComponent();

    this.registerBindings();
    this.registerEvents();
    this.setLocation(event);

    return false;
  }

  registerEvents() {
    this.ctxComponent.instance.onClose.subscribe(() => {
      this.closeMenu()
    });
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
