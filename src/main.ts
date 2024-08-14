import { bootstrapApplication } from '@angular/platform-browser';
import { ErrorHandler } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { GlobalErrorHandler } from './app/globel-error-handler';

// bootstrapApplication(AppComponent).catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
}).catch(err => console.error(err));