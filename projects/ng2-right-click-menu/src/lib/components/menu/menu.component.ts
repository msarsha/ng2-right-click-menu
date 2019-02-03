import {
	Component,
	EventEmitter,
	Output,
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
	@Output() open = new EventEmitter();

	constructor() {}
}
