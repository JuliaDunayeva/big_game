import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    NgbModule
=======
    NgbModule,
>>>>>>> 9c463efde9bf82cd600f7369bcd3811ea3ecb116
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
