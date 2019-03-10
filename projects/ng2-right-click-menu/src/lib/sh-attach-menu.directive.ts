import {
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output
} from '@angular/core';
import { ShContextMenuService } from './sh-context-menu.service';
import { ShContextMenuComponent } from './sh-context-menu.component';
import { fromEvent, merge, Subscription } from 'rxjs';

export interface ContextOpenEvent {
	data: any;
	preventOpen: () => void;
	mouseEvent: MouseEvent;
}

@Directive({
	selector: '[shAttachMenu]'
})
export class ShAttachMenuDirective implements OnDestroy, OnInit {
	@Input('shAttachMenu') menu: ShContextMenuComponent;
	@Input('shMenuTriggers') triggers: string[];
	@Input('shMenuData') data: any;
	@Output() open = new EventEmitter<ContextOpenEvent>();
	sub: Subscription;

	constructor(
		private ctxService: ShContextMenuService,
		private elm: ElementRef
	) {}

	ngOnInit(): void {
		this.setupEvents();
	}

	private setupEvents() {
		const observables = [];

		if (!this.triggers) {
			observables.push(fromEvent(this.elm.nativeElement, 'contextmenu'));
		} else {
			this.triggers.forEach(t => {
				observables.push(fromEvent(this.elm.nativeElement, t));
			});
		}

		this.sub = merge(...observables).subscribe(this.openMenu.bind(this));
	}

	openMenu(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();

		let preventOpen = false;
		this.open.emit({
			data: this.data,
			mouseEvent: event,
			preventOpen: () => {
				preventOpen = true;
			}
		});

		if (preventOpen) return;

		this.ctxService.openMenu({
			menu: this.menu,
			mouseEvent: event,
			targetElement: this.elm,
			data: this.data
		});
	}

	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}
}
