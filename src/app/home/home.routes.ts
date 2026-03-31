import { Routes } from '@angular/router';
import { Home } from './home';

export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    // component: Home არა lazyLoading-ით
    loadComponent: () => import('./home').then((m) => m.Home),
  },
];
