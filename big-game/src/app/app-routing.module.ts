import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HorsePageComponent } from './horse-page/horse-page.component';


const routes: Routes = [
  {
    path:'sign-up',
    component: SignUpComponent
  },
  {
    path: 'horse-page',
    component: HorsePageComponent 
  },
  {
    path:'home-page',
    component: HomePageComponent
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
