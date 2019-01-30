import { Directive, HostListener, Input } from '@angular/core';
import { Ng2rcmMenuService } from '../services/ng2rcmMenu.service';
import { MenuComponent } from '../components/menu/menu.component';

@Directive({
	selector: '[ng2rcmAnchor]'
})
export class AnchorDirective {
	@Input() ng2rcmAnchor: MenuComponent;

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
