import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterEvent } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (!accountService.currentUser()) {
    return accountService.getAuthState().pipe(
      map((auth) => {
        if (auth.isAuthenticated) {
          return true;
        } else {
          router.navigate(['/account/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      })
    );
  }

  return of(true);
};
