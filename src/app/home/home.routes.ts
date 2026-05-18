import { Routes } from '@angular/router';
import { Home } from './home';
import { authGuard } from '../core/auth/auth.guard';

export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    // component: Home არა lazyLoading-ით
    canActivate: [authGuard],
    loadComponent: () => import('./home').then((m) => m.Home),
  },
];
