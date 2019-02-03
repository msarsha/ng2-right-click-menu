import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Ng2rcmModule } from 'ng2-right-click-menu';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, Ng2rcmModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
