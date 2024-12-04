import { HttpInterceptorFn, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject } from '@angular/core';

export const setXsrfTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenExtractor = inject(HttpXsrfTokenExtractor);
  const token = tokenExtractor.getToken() as string;
  let headers = req.headers;

  if(token) {
    headers = headers.set("X-XSRF-TOKEN", token);
  }

  if (!(req.body instanceof FormData)) {
    headers = headers.set("Content-Type", "application/json");
  }

  const request = req.clone({
    headers: headers,
    withCredentials: true
  });

  return next(request);
};
