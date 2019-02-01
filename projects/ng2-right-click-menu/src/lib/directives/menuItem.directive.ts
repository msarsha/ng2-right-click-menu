import {
	Directive,
	EventEmitter,
	HostListener,
	Input,
	Output,
	TemplateRef
} from '@angular/core';

@Directive({
	selector: '[menuItem]'
})
export class MenuItemDirective {
	@Output() click = new EventEmitter();
	@Input() menuItemData: any;

	constructor(public template: TemplateRef<any>) {}

	@HostListener('click', ['$event'])
	onItemClick(event: MouseEvent) {}
}
