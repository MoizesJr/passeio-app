import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthgoogleService } from './authgoogle.service';
import { Profile } from './landingpage/profile.model';

export const authGuard: CanActivateFn = (route, state) => {

const loginService: AuthgoogleService = inject(AuthgoogleService);
const router: Router = inject(Router);

const getLoggedProfile: Profile = loginService.getLoggedProfile();

if (getLoggedProfile) {
  return true;
}

router.navigate(['']);

return false;

};
