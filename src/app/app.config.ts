import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { TransactionFirebaseRepository } from '@org/data/firebase/repositories/transaction.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    {
      provide: 'TRANSACTION_REPOSITORY',
      useClass: TransactionFirebaseRepository,
    },
  ],
};
