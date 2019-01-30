import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Ng2rcmMenuService } from '../services/ng2rcmMenu.service';

@Directive({
	selector: '[menuItem]'
})
export class MenuItemDirective {
	@Output() click = new EventEmitter();

	constructor(private service: Ng2rcmMenuService) {}

	@HostListener('click', ['$event'])
	onItemClick(event: MouseEvent) {}
}
