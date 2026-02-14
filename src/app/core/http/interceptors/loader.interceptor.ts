import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { debounceTime, delay, finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  loader.start();
  return next(req).pipe(
    // delay(1000),
    finalize(() => loader.close()),
  );
};
