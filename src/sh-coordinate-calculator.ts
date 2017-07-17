import { ShContextPosition } from "./sh-context-menu.component";

export class ShContextMenuCoordinateCalculator {

  private x0: number;
  private y0: number;
  private xc: number;
  private yc: number;
  private x: number;
  private y: number;

  // calculate position for menu
  calculate( hostElement: HTMLElement, event: MouseEvent ): ShContextPosition {
    const clickedElement: Element = <Element>event.srcElement;

    // result goes to this.x0, this.y0
    this.calculateContainerOrigin( hostElement );

    // result goes to this.xc, this.yc
    this.calculateLocalOrigin( clickedElement );

    // result goes to this.x, this.y
    this.calculatePosition( event );

    return { left: this.x, top: this.y };
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

  // Calculate the origin coordinates. That's the top left corner of the
  // container element which is used for absolute positioning.
  // Results go to "this.x0" and "this.y0"
  private calculateContainerOrigin( hostElement: HTMLElement ): void {
    let containerElem: HTMLElement|null = this.getContainerElement( hostElement );
    if ( containerElem ) {
      let rect: ClientRect = containerElem.getClientRects()[ 0 ];
      this.x0 = rect.left;
      this.y0 = rect.top;
    } else {
      this.x0 = 0;
      this.y0 = 0;
    }
  }

  // Calculate origin of the clicked element.
  // In case of a svg element it is relative to the svg owner element.
  private calculateLocalOrigin( clickedElement: Element ) {
    let refElem: Element;

    if ( this.isSvgElement(clickedElement) ) {
      // SVG element
      // then offset from event is relative to owner svg
      const svg: SVGElement = <SVGElement>clickedElement;
      refElem = svg.ownerSVGElement;
    } else {
      // normal HTML element
      // then offset is relative to same element
      refElem = clickedElement;
    }

    let myRect: ClientRect = refElem.getClientRects()[ 0 ];
    this.xc = myRect.left;
    this.yc = myRect.top;
  }

  private isSvgElement( element: Element ): boolean {
    return ( element instanceof SVGElement );
  }

  private calculatePosition( event: MouseEvent ) {
    this.x = this.xc - this.x0 + event.offsetX;
    this.y = this.yc - this.y0 + event.offsetY;
  }
}
