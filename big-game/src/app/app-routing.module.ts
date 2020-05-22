import { CompetitionPageComponent } from './competition-page/competition-page.component';
import { BlackMarketPageComponent } from './black-market-page/black-market-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HorsePageComponent } from './horse-page/horse-page.component';
import { MyHorsesComponent } from './my-horses/my-horses.component';

const routes: Routes = [
  {
    path:'sign-up',
    component: SignUpComponent
  },
  {
    path: 'horse-page/:id',
    component: HorsePageComponent 
  },
  {
    path: 'my-horses/:id',
    component: MyHorsesComponent 
  },
  {
    path:'home-page',
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
    path: '',
    redirectTo: '/home-page',
    pathMatch:'full'
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
