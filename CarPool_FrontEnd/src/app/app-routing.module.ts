import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { BookRideComponent } from './components/book-ride/book-ride.component';
import { MyRidesComponent } from './components/my-rides/my-rides.component';
import { OfferRideComponent } from './components/offer-ride/offer-ride.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SelectRideComponent } from './components/select-ride/select-ride.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', component: SignUpComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'select-ride',
    component: SelectRideComponent,
    canActivate: [AuthGuard],
  },
  { path: 'book-ride', component: BookRideComponent, canActivate: [AuthGuard] },
  {
    path: 'offer-ride',
    component: OfferRideComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my-rides', component: MyRidesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
