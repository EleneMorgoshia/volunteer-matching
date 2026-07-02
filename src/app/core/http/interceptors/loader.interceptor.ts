import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { catchError, finalize, retry, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  const isAuthReq =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register') ||
    req.url.includes('/auth/refresh');
  let showSnackBar = (req.body as any)?.showSnackBar;

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
    // retry(3),
    tap((event) => {
      if (event instanceof HttpResponse) {
        if ((showSnackBar && (event.body as any)?.message) || req?.responseType === 'text')
          snackBar.open((event.body as any)?.message || '' + event.body, 'დახურვა', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
      }
    }),

    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401) {
        snackBar.open(err.error?.message ?? 'Something went wrong', 'დახურვა', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });

        return throwError(() => err);
      }

      // Refresh Token
      return authService.refresh().pipe(
        switchMap((response) => {
          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`,
            },
          });

          return next(retryReq);
        }),

        catchError((refreshError) => {
          authService.logout();
          return throwError(() => refreshError);
        }),
      );
    }),

    finalize(() => loader.close()),
  );
};
