import {ShContextService} from './sh-context-service';
import {
  Directive,
  Input,
  HostListener,
  ComponentRef,
  Output, EventEmitter
} from "@angular/core";

import {ShContextOverlayComponent} from './sh-context-overlay.component';
import {ShContextMenuComponent} from "./sh-context-menu.component";
import {InjectionService} from "./injector.service";
import {BeforeMenuEvent, IShContextMenuItem, IShContextOptions} from "./sh-context-menu.models";

@Directive({
  selector: '[sh-context]'
})
export class ShContextMenuDirective {
  @Input('sh-context') menuItems: IShContextMenuItem[];
  @Input('sh-data-context') dataContext: any;
  @Input('sh-options') options: IShContextOptions;

  @Output('onBeforeMenuOpen') onBeforeMenuOpen = new EventEmitter<BeforeMenuEvent>();

  ctxComponent: ComponentRef<ShContextMenuComponent>;
  overlayComponent: ComponentRef<ShContextOverlayComponent>;

  constructor(private ctxService: ShContextService,
              private injectionService: InjectionService) {
  }

  @HostListener('contextmenu', ['$event'])
  onClick(event: MouseEvent) {
    this.options = this.ctxService.setOptions(this.options);

    this.closeMenu();

    if ( this.contextMenuIsEmpty() ) {
      return;
    }

    if (this.onBeforeMenuOpen.observers.length > 0) {
      this.onBeforeMenuOpen.emit({
        event: event,
        items: this.menuItems,
        open: (modifiedItems: IShContextMenuItem[] = this.menuItems) => this.createMenu(event, modifiedItems)
      });
    } else {
      this.createMenu(event);
    }

    return false;
  }

  private createMenu(event: MouseEvent, items: IShContextMenuItem[] = this.menuItems) {
    this.overlayComponent = this.createOverlayComponent();
    this.ctxComponent = this.createContextComponent();

    this.registerBindings(items);
    this.registerEvents();
    this.setLocation(event);
  }

  registerEvents() {
    this.ctxComponent.instance.onClose.subscribe(() => {
      this.closeMenu()
    });

    this.overlayComponent.instance.onClick.subscribe(() => {
      this.closeMenu()
    });
  }

  registerBindings(menuItems: IShContextMenuItem[]) {
    this.ctxComponent.instance.items = menuItems;
    this.ctxComponent.instance.dataContext = this.dataContext;
  }

  createContextComponent(): ComponentRef<ShContextMenuComponent> {
    return this.injectionService.appendComponent(ShContextMenuComponent);
  }

  createOverlayComponent(): ComponentRef<ShContextOverlayComponent> {
    return this.injectionService.appendComponent(ShContextOverlayComponent);
  }

  setLocation(event: MouseEvent) {
    let {clientX, clientY} = event;

    this.ctxComponent.instance.position = {
      top: clientY,
      left: clientX
    };
  }

  closeMenu() {
    if (this.ctxComponent)
      this.ctxComponent.destroy();

    if (this.overlayComponent)
      this.overlayComponent.destroy();
  }

  private contextMenuIsEmpty(): boolean {
    return !this.menuItems || this.menuItems.length === 0;
  }
}
