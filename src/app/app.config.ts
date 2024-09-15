import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loaderInterceptor } from './cors/interceptors/loader.interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorsInterceptor } from './cors/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),

    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([loaderInterceptor,errorsInterceptor])),
    importProvidersFrom(NgxSpinnerModule),
    provideToastr(),
  ],
};
