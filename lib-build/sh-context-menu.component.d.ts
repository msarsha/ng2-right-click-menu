import { EventEmitter, OnInit, ElementRef, AfterContentInit } from "@angular/core";
import { IShContextMenuItem, IShContextOptions } from "./sh-context-menu.models";
import { ShContextService } from './sh-context-service';
export interface ShContextPosition {
    top: number;
    left: number;
}
export declare class ShContextMenuComponent implements OnInit, AfterContentInit {
    private ctxService;
    position: ShContextPosition;
    items: IShContextMenuItem[];
    dataContext: any;
    onClose: EventEmitter<{}>;
    options: IShContextOptions;
    childRef: ElementRef;
    constructor(ctxService: ShContextService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    getLabel(item: IShContextMenuItem): string;
    close(): void;
    onClick(item: IShContextMenuItem): void;
    private invokeOnClickWithTimeOut(item);
    isItemDisabled(item: IShContextMenuItem): boolean;
    isItemVisible(item: IShContextMenuItem): boolean;
    setRtlLocation(): void;
}
