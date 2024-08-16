import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorService } from './core/services/error.service';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { ShopService } from './core/services/shop.service';
import { InitService } from './core/services/init.service';
import { lastValueFrom } from 'rxjs';

function initializeApp(initService: InitService) {
  return () =>
    lastValueFrom(initService.init()).finally(() => {
      const splash = document.getElementById('initial-splash');
      if (splash) {
        splash.remove();
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [InitService],
    },
  ],
};
