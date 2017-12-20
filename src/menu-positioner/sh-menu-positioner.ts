import { ElementRef, Injectable } from "@angular/core";
import { ShContextMenuComponent } from "../sh-context-menu.component";


@Injectable()
export class ShMenuPositioner {

  private comp: ShContextMenuComponent;
  private childRef: ElementRef;

  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private x2: number;
  private y2: number;
  private ymax: number;
  private xmax: number;


  correctPosition( comp: ShContextMenuComponent, childRef: ElementRef ): void {
    this.comp = comp;
    this.childRef = childRef;

    this.initValues();
    this.catchBottom();
    this.catchRight();

    this.updatePosition();
  }


  private initValues(): void {
    const nat = this.childRef.nativeElement;
    this.x = nat.offsetLeft;
    this.y = nat.offsetTop;
    this.w = nat.offsetWidth;
    this.h = nat.offsetHeight;

    this.x2 = this.x + this.w;
    this.y2 = this.y + this.h;
    this.xmax = window.innerWidth - 1;
    this.ymax = window.innerHeight - 1;
  }


  private catchBottom(): void {
    // console.log( "catch bottom: y2=" + this.y2 + "  ymax=" + this.ymax);
    if ( this.y2 > this.ymax ) {
      const diff = this.y2 - this.ymax;
      this.y -= diff;
      if ( this.y < 0 ) {
        this.y = 0;
      }
      this.y2 = this.y + this.h;
    }
  }


  private catchRight(): void {
    // console.log( "catch right: x2=" + this.x2 + "  xmax=" + this.xmax);
    if ( this.x2 > this.xmax ) {
      const diff = this.x2 - this.xmax;
      this.x -= diff;
      if ( this.x < 0 ) {
        this.x = 0;
      }
      this.x2 = this.x + this.w;
    }
  }


  private updatePosition(): void {
    setTimeout( () => {
      this.comp.position.left = this.x;
      this.comp.position.top = this.y;
    }, 0);
  }
}
