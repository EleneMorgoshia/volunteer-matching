import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { catchError, finalize, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  const authService = inject(AuthService);

  const isAuthReq = req.url.includes('/login') || req.url.includes('/register');

  if (isAuthReq) {
    return next(req);
  }

  loader.start();

  const newReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + authService.getAccessToken(),
    },
  });

  return next(newReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authService.logout();
      }

      return throwError(() => err);
    }),
    finalize(() => loader.close()),
  );
};
