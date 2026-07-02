import { Route } from '@angular/router';
import { loginGuard } from '../../../../core/auth/auth.guard';

export const LOGIN_ROUTES: Route[] = [
  {
    path: 'login',
    title: 'login',
    loadComponent: () => import('./login').then((m) => m.Login),
    canActivate: [loginGuard],
  },
];
