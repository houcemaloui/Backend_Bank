import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token/token.service';

export const compteGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  const userRoles = tokenService.getUserRoles();
  console.log('🔍 Extracted Roles:', userRoles);
  if (!tokenService.isAuthenticated()) {
    console.warn('No token found! Redirecting to login...');
    router.navigate(['/login']);
    return false;
  }

  if (userRoles.includes('ADMIN')) {
    console.log('Access granted to ADMIN');
    return true;
  } else {
    console.warn('User is not an admin! Redirecting...');
    router.navigate(['/bancaireuser']);
    return false;
  }
};