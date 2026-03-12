import { Route } from '@angular/router';

export const LOGIN_ROUTES: Route[] = [
  {
    path: 'login',
    title: 'login',
    loadComponent: () => import('./login').then((m) => m.Login),
  },
];
