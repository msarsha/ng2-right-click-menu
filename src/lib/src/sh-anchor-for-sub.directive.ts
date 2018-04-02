// import {Directive, ElementRef, Input, OnDestroy} from '@angular/core';
//  import {ShContextMenuComponent} from './sh-context-menu.component';
// import {fromEvent} from 'rxjs/observable/fromEvent';
// import {Subscription} from 'rxjs/Subscription';
// import {ShContextMenuService} from './sh-context-menu.service';
//
// @Directive({
//   selector: '[shAnchorForSub]'
// })
// export class ShAnchorForSubDirective implements OnDestroy {
//   @Input('shAnchorForSub') menu: ShContextMenuComponent;
//   @Input('shMenuData') data: any;
//
//   sub: Subscription;
//
//   open = false;
//
//   constructor(private ctxService: ShContextMenuService,
//               private elm: ElementRef,
//               private hostMenu: ShContextMenuComponent) {
//     this.addClasses();
//
//     this.sub = fromEvent(this.elm.nativeElement, 'mouseenter')
//       .subscribe(this.openSubMenu.bind(this));
//   }
//
//   openSubMenu(event: MouseEvent) {
//     if (this.open) {
//       return;
//     }
//
//     this.open = true;
//     this.ctxService.openSubMenu({
//       menu: this.menu,
//       mouseEvent: event,
//       targetElement: this.elm,
//       data: this.data,
//       hostMenu: this.hostMenu
//     });
//   }
//
//   addClasses() {
//     const element: HTMLElement = this.elm.nativeElement;
//     element.classList.add('sh-sub-anchor');
//   }
//
//   ngOnDestroy(): void {
//     this.sub.unsubscribe();
//   }
// }
