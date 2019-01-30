import {
	AfterViewInit,
	Component,
	TemplateRef,
	ViewChild,
	ViewContainerRef
} from '@angular/core';

@Component({
	selector: 'ng2rcm-menu',
	styleUrls: ['./menu.component.css'],
	templateUrl: './menu.component.html'
})
export class MenuComponent {
	@ViewChild('tmpl') template: TemplateRef<any>;
	constructor(public vcRef: ViewContainerRef) {}
}
