import { Directive, Output, ElementRef, EventEmitter, Input, HostListener, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnInit } from "@angular/core";

import { ShContextMenuComponent, ShContextPosition } from "./sh-context-menu.component";
import { ShContextService } from "./sh-context-service";
import { IShContextMenuItem, IShContextOptions } from "./sh-context-menu.models";

@Directive({
  selector: '[sh-context-sub-menu]'
})
export class ShContextSubMenuDirective implements OnInit {
  @Input('sh-context-sub-menu') menuItems: IShContextMenuItem[];
  @Input('sh-data-context') dataContext: any;
  @Input('sh-host-comp') hostComp: ShContextMenuComponent;
  @Output() closeSubMenu = new EventEmitter();

  options: IShContextOptions;
  ctxComponent: ComponentRef<ShContextMenuComponent>;

  constructor(
    private viewRef: ViewContainerRef,
    private elmRef: ElementRef,
    private resolver: ComponentFactoryResolver,
    private ctxService: ShContextService
  ) { }

  ngOnInit(): void {
    this.options = this.ctxService.getOptions();
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter( event: MouseEvent) {
    this.hostComp.closeCurrentlyOpenedSubMenu();
    this.ctxComponent = this.createContextComponent();

    this.registerBindings();
    this.registerEvents();
    this.setLocation();

    this.hostComp.setCurrentlyOpenedSubMenu( this );

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
    const { top, left, width } =
      this.elmRef.nativeElement.getClientRects()[0];

    let position: ShContextPosition = {
      top: top,
      left: this.options.rtl ? left : left + width
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
