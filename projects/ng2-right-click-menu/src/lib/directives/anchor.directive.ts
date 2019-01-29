import { Directive, HostListener, Input } from '@angular/core';
import { MenuDirective } from './menu.directive';
import { Ng2rcmMenuService } from '../services/ng2rcmMenu.service';

@Directive({
	selector: '[ng2rcmAnchor]'
})
export class AnchorDirective {
	@Input() ng2rcmAnchor: MenuDirective;

	constructor(private service: Ng2rcmMenuService) {}

	@HostListener('contextmenu', ['$event'])
	onRightClick(event: MouseEvent) {
		event.preventDefault();
		this.service.open({
			event,
			menu: this.ng2rcmAnchor
		});
	}
}
