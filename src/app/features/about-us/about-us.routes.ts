import { Routes } from '@angular/router';

export const ABOUT_US_ROUTES: Routes = [
  {
    path: 'about-us',
    title: 'About Us',
    loadComponent: () => import('./about-us').then(m => m.AboutUs),
  },
];