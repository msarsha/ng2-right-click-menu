import {Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: any[];

  constructor() {
    this.items = [
      {
        label: 'Item One'
      },
      {
        label: 'Item Two'
      }
    ];
  }

  onClick(event) {
    console.log('clicked', this, event);
  }

  isVisible(event) {
    return true;
  }
}
