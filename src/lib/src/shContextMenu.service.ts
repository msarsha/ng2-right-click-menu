import {Injectable} from '@angular/core';
import {ShContextMenuComponent} from './shContextMenu';

@Injectable()
export class ShContextMenuService {

  constructor() {
  }

  openMenu(menu: ShContextMenuComponent, event: MouseEvent) {
    menu.show();
  }
}
