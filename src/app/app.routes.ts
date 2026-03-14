import { Routes } from '@angular/router';
import { LOGIN_ROUTES } from './features/auth-entry/components/login/login.routes';
import { REGISTRATION_ROUTES } from './features/auth-entry/components/registration/registration.routes';

export const routes: Routes = [
  ...LOGIN_ROUTES,
  ...REGISTRATION_ROUTES,
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
];
