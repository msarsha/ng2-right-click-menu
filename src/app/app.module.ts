import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ShContextMenuModule} from 'ng2-right-click-menu';

@NgModule({
  declarations: [
    AppComponent
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
