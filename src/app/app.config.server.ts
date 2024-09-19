import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { TransactionService } from '@org/presentation';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), { provide: TransactionService }],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
