import { Routes } from '@angular/router';

export const DETAILS_ROUTES: Routes = [
  {
    path: 'event/:id',
    title: 'Event Detail',
    loadComponent: () =>
      import('./event-details/event-details').then((m) => m.EventDetails),
  },
];