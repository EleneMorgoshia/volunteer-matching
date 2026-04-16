import { Route } from '@angular/router';

export const VOLUNTEER_ROUTES: Route[] = [
  {
    path: 'volunteer',
    loadComponent: () =>
      import('./pages/voluteer-profile/voluteer-profile').then((m) => m.VoluteerProfile),

    children: [
      {
        path: 'edit',
        loadComponent: () =>
          import('./pages/volunteer-edit/volunteer-edit').then((m) => m.VolunteerEdit),
      },
    ],
  },
];
