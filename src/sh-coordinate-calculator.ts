import { ShContextPosition } from "./sh-context-menu.component";

export class ShContextMenuCoordinateCalculator {

  calculate( hostElement: HTMLElement, event: MouseEvent ): ShContextPosition {
    let containerElem: HTMLElement|null = this.getContainerElement( hostElement );

    let x0 = 0, y0 = 0;

    if ( containerElem ) {
      let rect: ClientRect = containerElem.getClientRects()[ 0 ];
      // console.log("parent's client rect: ", rect);
      x0 = rect.left;
      y0 = rect.top;
    }

    let htmlElem: HTMLElement|null = <HTMLElement>event.srcElement;

    let myRect: ClientRect = htmlElem.getClientRects()[ 0 ];
    // console.log("our client rect: ", myRect);
    let xc = myRect.left;
    let yc = myRect.top;

    let x, y: number;

    if (htmlElem) {
      x = xc - x0 + event.offsetX;
      y = yc - y0 + event.offsetY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }

    return { left: x, top: y };
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
    // console.log("Style of ", act);
    // console.log("is ", style);

    if ( style ) {
      let pos = style.position;
      // console.log("position = ", pos);

      return (pos !== "static");
    }

    return false;
  }

}
