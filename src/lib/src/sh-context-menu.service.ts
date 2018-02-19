import {Injectable} from '@angular/core';
import {ShContextMenuComponent} from './sh-context-menu.component';

@Injectable()
export class ShContextMenuService {

  constructor() {
  }

  openMenu(menu: ShContextMenuComponent, event: MouseEvent) {
    menu.show();
  }
}
