import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

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
    tap((event) => {
      if (event instanceof HttpResponse && (event.body as any)?.message) {
        snackBar.open((event.body as any)?.message, 'დახურვა', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      }
    }),

    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authService.logout();
      }
      snackBar.open(err.error.message, 'დახურვა', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });

      return throwError(() => err);
    }),

    finalize(() => loader.close()),
  );
};
