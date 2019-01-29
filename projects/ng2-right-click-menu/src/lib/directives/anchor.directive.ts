import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[ng2rcmAnchor]'
})
export class AnchorDirective {

  @Input() ng2rcmAnchor: TemplateRef<any>;

  constructor() {
  }

}
