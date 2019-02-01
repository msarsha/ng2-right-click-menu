import { Component, TemplateRef } from '@angular/core';
import { ContextMenuRef } from '../../interfaces';

@Component({
	templateUrl: './menu-wrapper.html'
})
export class MenuWrapperComponent {
	template: TemplateRef<any>;
	context: any;

	constructor(public menuRef: ContextMenuRef) {
		this.context = {
			$implicit: menuRef.data
		};

		this.template = menuRef.template;
	}
}
