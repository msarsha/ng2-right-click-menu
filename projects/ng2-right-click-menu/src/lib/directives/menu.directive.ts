import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[ng2rcmMenu]'
})
export class MenuDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
