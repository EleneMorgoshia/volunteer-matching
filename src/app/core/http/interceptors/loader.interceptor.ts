import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { catchError, debounceTime, delay, finalize, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  const authServise = inject(AuthService);
  const isAuthReq = req.url.includes('login') || req.url.includes('register');
  loader.start();

  const newReq = !isAuthReq
    ? req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authServise.getAccessToken(),
        },
      })
    : req;

  return next(newReq).pipe(
    // delay(1000),
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !isAuthReq) {
        // ტოკენს გაუვიდა ვადა
        authServise.logout();
      }
      return throwError(() => err);
    }),
    finalize(() => loader.close()),
  );
};
