import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/admin', 'login']);
  }
  return false;
};
