import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbdRatingForm } from './rating-form';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HorsePageComponent } from './horse-page/horse-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { BlackMarketPageComponent } from './black-market-page/black-market-page.component';
import { CompetitionPageComponent } from './competition-page/competition-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { PlayBarComponent } from './play-bar/play-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NgbdRatingForm,
    HomePageComponent,
    SignUpComponent,
    HorsePageComponent,
    StorePageComponent,
    BlackMarketPageComponent,
    CompetitionPageComponent,
    NavBarComponent,
    FooterComponent,
    PlayBarComponent
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