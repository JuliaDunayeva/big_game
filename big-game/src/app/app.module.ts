import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbdRatingForm } from './rating-form';

@NgModule({
  declarations: [
    AppComponent,
    NgbdRatingForm
  ],
  
   
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
    //,NgbModule.forRoot()
  ],
  exports: [NgbdRatingForm],
  providers: [],
  bootstrap: [AppComponent,NgbdRatingForm]
})
export class AppModule { }
export class NgbdRatingFormModule {}