import { TemplateRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

export class ContextMenuRef {
	constructor(
		public template: TemplateRef<any>,
		public overlayRef: OverlayRef
	) {}
}

export interface ContextMenu {}
