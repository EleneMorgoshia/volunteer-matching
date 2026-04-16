import { Route } from '@angular/router';
import { VOLUNTEER_ROUTES } from './volunteer/volunteer.routes';
import { Profile } from './profile';

export const PROFILE_ROUTES: Route[] = [
  {
    path: 'profile',
    component: Profile,
    children: [
      { path: '', redirectTo: 'volunteer', pathMatch: 'full' },
      ...VOLUNTEER_ROUTES,
      // ...ORGANISATION_ROUTES,
    ],
  },
];
