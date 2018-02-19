import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent, MyMenuComponent} from './app.component';
import {ShContextMenuModule} from 'ng2-right-click-menu';

@NgModule({
  declarations: [
    AppComponent,
    MyMenuComponent
  ],
  imports: [
    BrowserModule,
    ShContextMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
