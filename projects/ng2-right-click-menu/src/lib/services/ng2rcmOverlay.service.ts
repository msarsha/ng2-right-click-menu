import { Injectable } from '@angular/core';
import {
	ConnectionPositionPair,
	Overlay,
	OverlayRef
} from '@angular/cdk/overlay';
import { Ng2rcmPositionStrategyBuilderService } from './ng2rcmPositionStrategyBuilder.service';

@Injectable({
	providedIn: 'root'
})
export class Ng2rcmOverlayService {
	constructor(
		private overlay: Overlay,
		private positionStrategyBuilder: Ng2rcmPositionStrategyBuilderService
	) {}

	create(event: MouseEvent): OverlayRef {
		const positionStrategy = this.positionStrategyBuilder.create(event);
		const scrollStrategy = this.createScrollStrategy();

		return this.overlay.create({
			positionStrategy,
			scrollStrategy,
			hasBackdrop: true,
			backdropClass: 'ng2rcm-backdrop'
		});
	}

	private createScrollStrategy() {
		return this.overlay.scrollStrategies.reposition({ autoClose: true });
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
