import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackbar = inject(SnackbarService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 400) {
        const errors = err.error.errors;
        if (errors) {
          const modelStateErrors = [];
          console.log(errors);
          for (const error in errors) {
            if (errors[error]) {
              modelStateErrors.push(errors[error]);
            }
          }
          throw modelStateErrors.flat();
        } else {
          snackbar.error(err.error.title || err.error);
        }
      }
      if (err.status === 401) {
        snackbar.error(err.error.title || err.error);
      }
      if (err.status === 404) {
        router.navigateByUrl('/not-found');
      }
      if (err.status === 500) {
        const navigationExtras: NavigationExtras = {
          state: { error: err.error },
        };
        router.navigateByUrl('/server-error', navigationExtras);
      }
      return throwError(() => err);
    })
  );
};
