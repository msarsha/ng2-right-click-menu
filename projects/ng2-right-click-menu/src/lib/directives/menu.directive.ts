import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[ng2rcmMenu]',
	exportAs: 'ng2rcmMenu'
})
export class MenuDirective {
	constructor(
		public template: TemplateRef<any>,
		public vcRef: ViewContainerRef
	) {}
}
