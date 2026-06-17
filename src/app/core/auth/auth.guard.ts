import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  //ეს დავაკომენტარეთ დროებით იმიტორო გავსტილო ჰოუმი
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  // const currentProfileUrl = authService.isOrganization()
  //   ? ['/organization/profile']
  //   : ['/volunteer/profile'];
  // return router.createUrlTree(currentProfileUrl);
  return true;
};
export const volunteerGuard: CanActivateFn = () => {
  //სულ ორი წამი ვაკომენტარებ გასასტილად
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (!authService.isVolunteer()) {
    return router.createUrlTree(['/organization/profile']);
  }

  return true;
};

export const organizationGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (!authService.isOrganization()) {
    return router.createUrlTree(['/volunteer/profile']);
  }

  return true;
};
