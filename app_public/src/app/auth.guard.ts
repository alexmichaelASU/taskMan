import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { ApiRequestsService } from './services/api-requests.service';

export const authGuard: CanActivateFn = () => {
  const apiReq = inject(ApiRequestsService);
  const router = inject(Router);
  
  if (apiReq.isLoggedIn()) {
      return true;
  } else {
      router.navigate(['/login']);
      return false;
  }
};