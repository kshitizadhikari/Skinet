import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorService } from './core/services/error.service';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { ShopService } from './core/services/shop.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
    ErrorService,
    ShopService,
  ],
};
