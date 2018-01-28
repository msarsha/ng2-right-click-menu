import { ElementRef } from '@angular/core';
import { AfterContentInit } from '@angular/core';
export declare class HtmlDirective implements AfterContentInit {
    private elmRef;
    content: String;
    constructor(elmRef: ElementRef);
    ngAfterContentInit(): void;
}
