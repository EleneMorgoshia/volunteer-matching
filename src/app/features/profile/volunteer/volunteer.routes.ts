import { Routes } from '@angular/router';
import { VoluteerProfile } from './pages/voluteer-profile/voluteer-profile';

export const VOLUNTEER_ROUTES: Routes = [
  {
    path: 'volunteer/profile',
    loadComponent: () =>
      import('./pages/voluteer-profile/voluteer-profile').then((m) => m.VoluteerProfile),
  },
  {
    path: 'volunteer/edit',
    loadComponent: () =>
      import('./pages/volunteer-edit/volunteer-edit').then((m) => m.VolunteerEdit),
  },
];
