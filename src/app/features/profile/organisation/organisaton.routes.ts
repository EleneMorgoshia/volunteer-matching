import { Routes } from '@angular/router';

export const ORGANIZATION_ROUTES: Routes = [
  {
    path: 'organization/profile',
    loadComponent: () =>
      import('./pages/organization-profile/organization-profile').then(
        (m) => m.OrganizationProfile,
      ),
  },
  {
    path: 'organization/edit',
    loadComponent: () =>
      import('./pages/organization-edit/organization-edit').then((m) => m.OrganizationEdit),
  },
];
