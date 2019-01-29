import {
	AfterContentInit,
	AfterViewInit,
	Component,
	ContentChildren,
	QueryList,
	TemplateRef,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { ContextMenuRef } from '../../interfaces';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
	styleUrls: ['./menu.component.css'],
	templateUrl: './menu.component.html'
})
export class MenuComponent implements AfterContentInit, AfterViewInit {
	template: TemplateRef<any>;
	@ContentChildren(MenuItemComponent) items: QueryList<any>;
	@ViewChild('container', { read: ViewContainerRef })
	container: ViewContainerRef;

	constructor(private menuRef: ContextMenuRef) {
		this.template = menuRef.template;
	}

	onClick() {
		console.log(this);
	}

	ngAfterContentInit(): void {
		this.items.changes.subscribe(() => {
			console.log('child', this.items);
		});
	}

	ngAfterViewInit(): void {
		this.container.injector;
		this.container.createEmbeddedView(this.menuRef.template);
	}
}
