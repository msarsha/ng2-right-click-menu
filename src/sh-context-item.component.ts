import { Component, Input } from "@angular/core";
import { IShContextMenuItem } from "./sh-context-item";

@Component({
  selector: 'sh-context-item',
  template: `

  `,
  styles: [`

  `]
})
export class ShContextMenuItem {
  @Input() item: IShContextMenuItem;

}
