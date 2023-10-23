import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { MagazineComponent } from './magazine';
import { MagazineCreateComponent } from './magazine/magazine-create.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'magazine', component: MagazineComponent },
  { path: 'magazine-create', component: MagazineCreateComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
