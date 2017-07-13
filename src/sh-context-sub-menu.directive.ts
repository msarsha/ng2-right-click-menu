import { IShContextOptions } from './sh-context-options';
import { Directive, Output, ElementRef, EventEmitter, Input, HostListener, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnInit } from "@angular/core";

import { IShContextMenuItem } from "./sh-context-item";
import { ShContextMenuComponent, ShContextPosition } from "./sh-context-menu.component";
import { ShContextService } from "./sh-context-service";

@Directive({
  selector: '[sh-context-sub-menu]'
})
export class ShContextSubMenuDirective implements OnInit {
  @Input('sh-context-sub-menu') menuItems: IShContextMenuItem[];
  @Input('sh-data-context') dataContext: any;
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
    const native = this.elmRef.nativeElement;
    const { width } =
      native.getClientRects()[0];

    const offsPar = native.offsetParent;
    const x = offsPar.offsetLeft;
    const y = offsPar.offsetTop + native.offsetTop;

    let position = {
      top: y,
      left: this.options.rtl ? x : x + width
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
