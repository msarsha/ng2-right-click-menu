import { ShContextPosition } from "./sh-context-menu.component";

export class ShContextMenuCoordinateCalculator {

  // calculate position for menu
  calculate( hostElement: HTMLElement, event: MouseEvent ): ShContextPosition {
    let containerElem: HTMLElement|null = this.getContainerElement( hostElement );

    let x0 = 0, y0 = 0;

    if ( containerElem ) {
      let rect: ClientRect = containerElem.getClientRects()[ 0 ];
      x0 = rect.left;
      y0 = rect.top;
    }

    let htmlElem: HTMLElement|null = <HTMLElement>event.srcElement;

    let xc, yc;

    let refElem: Element;

    if ( event.srcElement instanceof SVGElement ) {
      // SVG element
      // then offset from event is relative to owner svg
      let svg: SVGElement = event.srcElement;
      refElem = svg.ownerSVGElement;
    } else {
      // normal HTML element
      // then offset is relative to same element
      refElem = htmlElem;
    }

    let myRect: ClientRect = refElem.getClientRects()[ 0 ];
    xc = myRect.left;
    yc = myRect.top;


    let x, y: number;

    console.log("host elem ", hostElement);
    console.log("html elem ", htmlElem);
    console.log("calc x0 y0 ", x0, y0);
    console.log("calc xc yc ", xc, yc);
    console.log("event.offsetX/Y ", event.offsetX, event.offsetY);

    if (htmlElem) {
      x = xc - x0 + event.offsetX;
      y = yc - y0 + event.offsetY;
    } else {
      console.warn("using fallback for position calculation.")
      x = event.clientX;
      y = event.clientY;
    }

    console.log("x y ", x, y);
    console.log("---------------");

    return { left: x, top: y };
  }

  // calculate position for sub menu
  calculateSub( element: HTMLElement, isRtl: boolean ): ShContextPosition {
    const { width } = element.getClientRects()[0];

    let y0 = 0;
    let containerElem: HTMLElement|null = this.getContainerElement( element );

    if ( containerElem ) {
      let rect: ClientRect = containerElem.getClientRects()[ 0 ];
      y0 = rect.top;
    }

    let rect1 = element.getClientRects()[0];
    let y = rect1.top - y0;

    return { left: isRtl ? 0 : width, top: y };
  }

  // Get the top container element which is used as base for
  // the fixed positioning (position: fixed).
  // Returns null if no container found, then <html> tag is the container.
  private getContainerElement( srcElement: HTMLElement ): HTMLElement|null {
    let finished = false;

    let act: HTMLElement|null = srcElement;

    while ( ! finished ) {
      act = <HTMLElement>act.parentNode;
      if ( this.isRelevantContainer( act ) ) {
        return act;
      }
      if ( ! act ) {
        finished = true;
      }
    }

    return null;
  }

  // Check if the html element is a container relevant
  // for fixed positioning. This is the case if its position
  // is other than "static".
  private isRelevantContainer( act: HTMLElement ): boolean {
    let style = getComputedStyle( act );
    return ( style && style.position !== "static" );
  }

}
