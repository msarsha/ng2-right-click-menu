import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'sh-context-overlay',
  template: `<div class="sh-context-overlay" (mousedown)="onClick.emit()"></div>`,
  styles: [`
    .sh-context-overlay{
      position: fixed;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9998;
      background-color: transparent;
   }
  `]
})
export class ShContextOverlayComponent{
  @Output() onClick = new EventEmitter()
}
