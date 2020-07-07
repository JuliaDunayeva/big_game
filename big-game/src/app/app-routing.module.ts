import { ProfileComponent } from './profile/profile.component';
import { CompetitionPageComponent } from './competition-page/competition-page.component';
import { BlackMarketPageComponent } from './black-market-page/black-market-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HorsePageComponent } from './horse-page/horse-page.component';
import { CompetitionsComponent } from './competition-page/competitions/competitions.component';
import { HorseListComponent } from './horse-list/horse-list.component';
import { HorseSaleComponent } from './horse-sale/horse-sale.component';
import { TackPageComponent } from './store-page/tack-page/tack-page.component';
import { HorseBreedingComponent } from './horse-breeding/horse-breeding.component';
import { EquipmentComponent } from './store-page/equipment/equipment.component';
import { EqcenterRegisterComponent } from './eqcenter-register/eqcenter-register.component';
import { EqcenterComponent } from './eqcenter/eqcenter.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'horse-list',
    component: HorseListComponent
  },
  {
    path: 'horse-page',
    component: HorsePageComponent
  },
  {
    path: 'horse-sale',
    component: HorseSaleComponent
  },
  {
    path: 'breeding',
    component: HorseBreedingComponent
  },
  {
    path: 'home-page',
    component: HomePageComponent
  },
  {
    path: 'store-page',
    component: StorePageComponent
  },
  {
    path: 'bmarket-page',
    component: BlackMarketPageComponent
  },
  {
    path: 'competition-page',
    component: CompetitionPageComponent
  },
  {
    path: 'competitions',
    component: CompetitionsComponent
  },
  {
    path: 'tack-page',
    component: TackPageComponent
  },
  {
    path: 'equipment',
    component: EquipmentComponent
  },
  {
    path: 'eqRegister',
    component: EqcenterRegisterComponent
  },
  {
    path: 'eqCenter',
    component: EqcenterComponent
  },
  {
    path: '',
    redirectTo: '/home-page',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
