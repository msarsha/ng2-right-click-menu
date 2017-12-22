import { Directive, Output, ElementRef, EventEmitter, Input, HostListener, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnInit } from "@angular/core";

import { ShContextMenuComponent, ShContextPosition } from "./sh-context-menu.component";
import { ShContextService } from "./sh-context-service";
import {IShContextMenuItem, IShContextOptions} from "./sh-context-menu.models";

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

  @HostListener('mouseenter', ['$event'])
  onMouseEnter( event: MouseEvent) {
    console.log( "enter" );
    this.closeCurrent();
    this.ctxComponent = this.createContextComponent();

    this.registerBindings();
    this.registerEvents();
    this.setLocation();

    let comp = this.ctxComponent.instance;
    console.log( "subcomp created, pos=" + comp.position.left + "/" + comp.position.top );

    return false;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave( event: MouseEvent) {
    console.log( "leave" );

    setTimeout( () => this.onLeaveDelayed(), 50 );


    // this.closeCurrent();
    // this.ctxComponent = this.createContextComponent();
    //
    // this.registerBindings();
    // this.registerEvents();
    // this.setLocation();

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

  private onLeaveDelayed() {
    if ( this.ctxComponent ) {
      console.log( "subcomp already there" );
      if ( this.ctxComponent.instance.hasEntered ) {
        console.log( "  -> has entered!" );
        this.ctxComponent.instance.hasEntered = false;
        return;
      }

      this.closeCurrent();
    }

  }
}
