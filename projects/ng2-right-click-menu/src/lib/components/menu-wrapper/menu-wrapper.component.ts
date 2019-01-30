import { Component, TemplateRef } from '@angular/core';
import { ContextMenuRef } from '../../interfaces';

@Component({
	templateUrl: './menu-wrapper.html'
})
export class MenuWrapperComponent {
	template: TemplateRef<any>;

	constructor(public menuRef: ContextMenuRef) {
		this.template = menuRef.template;
	}
}
