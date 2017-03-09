import { Directive, Output, ElementRef, EventEmitter, Input, HostListener, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from "@angular/core";
import { IShContextMenuItem } from "./sh-context-item";
import { ShContextMenuComponent, CtxPosition } from "./sh-context-menu.component";

@Directive({
  selector: '[sh-context-sub-menu]'
})
export class ShContextSubMenuDirective {
  @Input('sh-context-sub-menu') menuItems: IShContextMenuItem[];
  @Input('sh-data-context') dataContext: any;
  @Output() closeSubMenu = new EventEmitter();

  ctxComponent: ComponentRef<ShContextMenuComponent>;

  constructor(private viewRef: ViewContainerRef,
    private elmRef: ElementRef,
    private resolver: ComponentFactoryResolver) {
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    this.closeCurrent();
    this.ctxComponent = this.createContextComponent();

    this.registerBindings();
    this.registerEvents();
    this.setLocation();

    return false;
  }

  registerEvents() {
    this.ctxComponent.instance.onClose.subscribe(() => {
      this.closeSubMenu.emit();
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

  setLocation() {
    const elmRect: ClientRect =
      this.elmRef.nativeElement.getClientRects()[0];

    let position: CtxPosition = {
      top: elmRect.top + 'px',
      left: elmRect.left + elmRect.width + 8 + 'px'
    };

    this.ctxComponent.instance.position = position;
  }

  closeMenu() {
    this.closeSubMenu.emit();
  }

  closeCurrent() {
    this.viewRef.clear();
  }
}
