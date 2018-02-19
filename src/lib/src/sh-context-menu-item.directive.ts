import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[shContextMenuItem]'
})
export class ShContextMenuItemDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
