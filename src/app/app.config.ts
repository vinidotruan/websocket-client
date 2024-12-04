import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from "@angular/common/http";
import { setAuthTokenInterceptorInterceptor } from "./interceptors/set-auth-token.interceptor";
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { setXsrfTokenInterceptor } from './interceptors/set-xsrf-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: "XSRF-TOKEN",
        headerName: "X-XSRF-TOKEN"
      }),
      withInterceptors([
        setXsrfTokenInterceptor,
        setAuthTokenInterceptorInterceptor,
        loadingInterceptor
      ])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
