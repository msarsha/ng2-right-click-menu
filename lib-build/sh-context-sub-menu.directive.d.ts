import { ElementRef, EventEmitter, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnInit } from "@angular/core";
import { ShContextMenuComponent } from "./sh-context-menu.component";
import { ShContextService } from "./sh-context-service";
import { IShContextMenuItem, IShContextOptions } from "./sh-context-menu.models";
export declare class ShContextSubMenuDirective implements OnInit {
    private viewRef;
    private elmRef;
    private resolver;
    private ctxService;
    menuItems: IShContextMenuItem[];
    dataContext: any;
    closeSubMenu: EventEmitter<{}>;
    options: IShContextOptions;
    ctxComponent: ComponentRef<ShContextMenuComponent>;
    constructor(viewRef: ViewContainerRef, elmRef: ElementRef, resolver: ComponentFactoryResolver, ctxService: ShContextService);
    ngOnInit(): void;
    onMouseOver(event: MouseEvent): boolean;
    registerEvents(): void;
    registerBindings(): void;
    createContextComponent(): ComponentRef<ShContextMenuComponent>;
    setLocation(): void;
    closeMenu(): void;
    closeCurrent(): void;
}
