//import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';

//const routes: Routes = [];

//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule]
//})
//export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagazineComponent } from './magazine/magazine.component';
import { ApplicationUserComponent } from './application-user/application-user.component';

const routes: Routes = [
  { path: 'magazines', component: MagazineComponent },
  { path: 'application-user', component: ApplicationUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
