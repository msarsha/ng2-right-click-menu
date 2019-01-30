import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[ng2rcmMenu]',
	exportAs: 'ng2rcmMenu'
})
export class MenuDirective {
	constructor(
		public templateRef: TemplateRef<any>,
		public vcRef: ViewContainerRef
	) {}
}
