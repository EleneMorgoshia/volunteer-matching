import { Route } from "@angular/router"

export const REGISTRATION_ROUTES:Route[] = [
  {
    path:'registration',
    title:'registration',
    loadComponent:() => import('./registration').then(m => m.Registration)
  }
]