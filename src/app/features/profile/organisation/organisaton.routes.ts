import { Routes } from '@angular/router';
import { authGuard, organizationGuard } from '../../../core/auth/auth.guard';

export const ORGANIZATION_ROUTES: Routes = [
  {
    path: 'organization/profile',
    loadComponent: () =>
      import('./pages/organization-profile/organization-profile').then(
        (m) => m.OrganizationProfile,
      ),
    canActivate: [authGuard, organizationGuard],
  },
  {
    path: 'organization/edit',
    loadComponent: () =>
      import('./pages/organization-edit/organization-edit').then((m) => m.OrganizationEdit),
    canActivate: [authGuard, organizationGuard],
  },
  {
    path: 'organization/events',
    loadComponent: () =>
      import('./pages/organization-event/organization-event').then((m) => m.OrganizationEvent),
    canActivate: [authGuard, organizationGuard],
  },

  // ეს როუთი მაინც რატო მაგდებს ორგანიაციის ივენთის დამატების გვერდზე?????
  {
    path: 'organization/event/edit',
    loadComponent: () =>
      import('./pages/organization-event-edit/organization-event-edit').then(
        (m) => m.OrganizationEventEdit,
      ),
    canActivate: [authGuard, organizationGuard],
  },
  {
    path: 'organization/event',
    pathMatch: 'full',
    redirectTo: 'organization/event/edit',
  },
];
