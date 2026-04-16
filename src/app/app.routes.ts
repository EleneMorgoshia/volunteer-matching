import { Routes } from '@angular/router';
import { LOGIN_ROUTES } from './features/auth-entry/components/login/login.routes';
import { REGISTRATION_ROUTES } from './features/auth-entry/components/registration/registration.routes';
import { HOME_ROUTES } from './home/home.routes';
import { PROFILE_ROUTES } from './features/profile/profile.routes';
import { ABOUT_US_ROUTES } from './features/about-us/about-us.routes';

export const routes: Routes = [
  ...LOGIN_ROUTES,
  ...REGISTRATION_ROUTES,
  ...HOME_ROUTES,
  ...PROFILE_ROUTES,
  ...ABOUT_US_ROUTES,
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
];
