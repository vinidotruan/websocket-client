import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { AuthService } from "@services/auth.service";

export const setAuthTokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.authToken;

  if (authService) {
    const newRequest = req.clone({
      headers: req.headers.append("Authorization", `Bearer ${authToken}`)
    });
    return next(newRequest);
  }

  return next(req);
};
