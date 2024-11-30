import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSpinnerConfig } from "ngx-spinner";
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideSpinnerConfig({type: 'ball-scale-multiple'}),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ]
};
