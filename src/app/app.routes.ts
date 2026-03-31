import { Routes } from '@angular/router';
import { LOGIN_ROUTES } from './features/auth-entry/components/login/login.routes';
import { REGISTRATION_ROUTES } from './features/auth-entry/components/registration/registration.routes';
import { HOME_ROUTES } from './home/home.routes';

export const routes: Routes = [
  ...LOGIN_ROUTES,
  ...REGISTRATION_ROUTES,
  ...HOME_ROUTES,
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
];
