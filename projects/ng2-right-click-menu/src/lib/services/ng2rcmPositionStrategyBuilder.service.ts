import { ElementRef, Inject, Injectable, Optional } from '@angular/core';
import {
	ConnectionPositionPair,
	FlexibleConnectedPositionStrategy,
	OverlayContainer,
	PositionStrategy,
	ViewportRuler
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class Ng2rcmPositionStrategyBuilderService {
	constructor(
		private viewportRuler: ViewportRuler,
		@Inject(DOCUMENT) private document: any,
		@Optional() private platform?: Platform,
		@Optional() private overlayContainer?: OverlayContainer
	) {}

	create(event: MouseEvent): ContextMenuPositionStrategy {
		return new ContextMenuPositionStrategy(
			event,
			this.viewportRuler,
			this.document,
			this.platform,
			this.overlayContainer
		)
			.withPush(true)
			.withPositions(this.createPositionPairs())
			.withViewportMargin(5);
	}

	private createPositionPairs(): ConnectionPositionPair[] {
		return [
			{
				originX: 'start',
				originY: 'top',
				overlayY: 'top',
				overlayX: 'start'
			}
		];
	}
}

export class ContextMenuPositionStrategy
	extends FlexibleConnectedPositionStrategy
	implements PositionStrategy {
	constructor(
		mouseEvent: MouseEvent,
		viewportRuler: ViewportRuler,
		document: Document,
		platform?: Platform | undefined,
		overlayContainer?: OverlayContainer | undefined
	) {
		const element = createElement(mouseEvent);
		super(element, viewportRuler, document, platform, overlayContainer);

		function createElement(event: MouseEvent): HTMLElement {
			const { clientX, clientY } = event;
			return <HTMLElement>{
				getBoundingClientRect: () => {
					return {
						left: clientX,
						right: clientX,
						bottom: clientY,
						top: clientY,
						height: 0,
						width: 0
					};
				}
			};
		}
	}
}
