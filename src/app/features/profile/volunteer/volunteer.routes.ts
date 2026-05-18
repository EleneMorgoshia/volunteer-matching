import { Routes } from '@angular/router';
import { VoluteerProfile } from './pages/voluteer-profile/voluteer-profile';
import { authGuard, volunteerGuard } from '../../../core/auth/auth.guard';

export const VOLUNTEER_ROUTES: Routes = [
  {
    path: 'volunteer/profile',
    loadComponent: () =>
      import('./pages/voluteer-profile/voluteer-profile').then((m) => m.VoluteerProfile),
    canActivate: [authGuard, volunteerGuard],
  },
  {
    path: 'volunteer/edit',
    loadComponent: () =>
      import('./pages/volunteer-edit/volunteer-edit').then((m) => m.VolunteerEdit),
    canActivate: [authGuard, volunteerGuard],
  },
];
