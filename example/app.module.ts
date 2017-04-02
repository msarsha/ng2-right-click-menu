import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShContextMenuModule } from 'ng2-right-click-menu/';
// import { ShContextMenuModule } from '../../../context-menu/src/sh-context-menu.module';

import { AppComponent } from './app.component';

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
export class AppModule { }
