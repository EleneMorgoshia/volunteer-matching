import { Routes } from '@angular/router';
import { LOGIN_ROUTES } from './features/auth-entry/components/login/login.routes';
import { REGISTRATION_ROUTES } from './features/auth-entry/components/registration/registration.routes';
import { HOME_ROUTES } from './home/home.routes';
import { VOLUNTEER_ROUTES } from './features/profile/volunteer/volunteer.routes';
import { ORGANIZATION_ROUTES } from './features/profile/organisation/organisaton.routes';
import { ABOUT_US_ROUTES } from './features/about-us/about-us.routes';

export const routes: Routes = [
  ...LOGIN_ROUTES,
  ...REGISTRATION_ROUTES,
  ...HOME_ROUTES,
  ...VOLUNTEER_ROUTES,
  ...ORGANIZATION_ROUTES,
  ...ABOUT_US_ROUTES,
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
