import { from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HorsePageComponent } from './horse-page/horse-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { BlackMarketPageComponent } from './black-market-page/black-market-page.component';
import { CompetitionPageComponent } from './competition-page/competition-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { PlayBarComponent } from './play-bar/play-bar.component';
import { LoginBtnComponent } from './home-page/login-btn/login-btn.component';
import { FlagsComponent } from './home-page/flags/flags.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CompetitionsComponent } from './competition-page/competitions/competitions.component';
import { HorseListComponent } from './horse-list/horse-list.component';
import { HorseSaleComponent } from './horse-sale/horse-sale.component';
import { MiniBarComponent } from './nav-bar/mini-bar/mini-bar.component';
import { PlayBarMiniComponent } from './play-bar/play-bar-mini/play-bar-mini.component';
import { ModalOptionsComponent } from './modal-options/modal-options.component';
import {TackPageComponent} from './../app/store-page/tack-page/tack-page.component';
import { HorseBreedingComponent } from './horse-breeding/horse-breeding.component';
import { TackDataComponent } from './../app/store-page/tack-page/tack-data/tack-data.component';
import { EquipmentComponent } from './store-page/equipment/equipment.component';
import { EquipmentUpdateComponent } from './store-page/equipment/equipment-update/equipment-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalOptionsComponent,
    HomePageComponent,
    SignUpComponent,
    HorsePageComponent,
    StorePageComponent,
    BlackMarketPageComponent,
    CompetitionPageComponent,
    NavBarComponent,
    FooterComponent,
    PlayBarComponent,
    LoginBtnComponent,
    FlagsComponent,
    CompetitionsComponent,
    HorseListComponent,
    HorseSaleComponent,
    MiniBarComponent,
    PlayBarMiniComponent,
    TackPageComponent,
    HorseBreedingComponent,
    TackDataComponent,
    EquipmentComponent,
    EquipmentUpdateComponent,
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
export class NgbdRatingFormModule {}
