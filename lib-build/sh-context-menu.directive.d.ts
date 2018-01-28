import { ShContextService } from './sh-context-service';
import { ComponentRef, EventEmitter } from "@angular/core";
import { ShContextOverlayComponent } from './sh-context-overlay.component';
import { ShContextMenuComponent } from "./sh-context-menu.component";
import { InjectionService } from "./injector.service";
import { BeforeMenuEvent, IShContextMenuItem, IShContextOptions } from "./sh-context-menu.models";
export declare class ShContextMenuDirective {
    private ctxService;
    private injectionService;
    menuItems: IShContextMenuItem[];
    dataContext: any;
    options: IShContextOptions;
    onBeforeMenuOpen: EventEmitter<BeforeMenuEvent>;
    ctxComponent: ComponentRef<ShContextMenuComponent>;
    overlayComponent: ComponentRef<ShContextOverlayComponent>;
    constructor(ctxService: ShContextService, injectionService: InjectionService);
    onClick(event: MouseEvent): boolean | void;
    private createMenu(event, items?);
    registerEvents(): void;
    registerBindings(menuItems: IShContextMenuItem[]): void;
    createContextComponent(): ComponentRef<ShContextMenuComponent>;
    createOverlayComponent(): ComponentRef<ShContextOverlayComponent>;
    setLocation(event: MouseEvent): void;
    closeMenu(): void;
    private contextMenuIsEmpty();
}
