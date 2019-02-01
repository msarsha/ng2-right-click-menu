import {
	Directive,
	HostListener,
	Input,
	TemplateRef,
	ViewContainerRef
} from '@angular/core';
import { Ng2rcmMenuService } from '../services/ng2rcmMenu.service';

@Directive({
	selector: '[ng2rcmAnchor]'
})
export class AnchorDirective {
	@Input() ng2rcmAnchor: TemplateRef<any>;
	@Input() data: any;

	constructor(
		private service: Ng2rcmMenuService,
		private vcRef: ViewContainerRef
	) {}

	@HostListener('contextmenu', ['$event'])
	onRightClick(event: MouseEvent) {
		event.preventDefault();
		this.service.open({
			event,
			data: this.data,
			menu: this.ng2rcmAnchor
		});
	}
}
