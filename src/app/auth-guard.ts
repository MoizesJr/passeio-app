import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './AuthService.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUsuarioLogado()) {
    return true;
  }
  router.navigate(['']); // Volta para o login se não estiver logado
  return false;
};