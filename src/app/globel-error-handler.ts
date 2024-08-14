import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    let errorMessage: string;

    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    } else {
      // Client-side error
      console.error(error);
      errorMessage = `Error: ${error.message}`;
    }
    // Log the error anyway
    console.error(error);

    // Show error to user
    errorService.showError(errorMessage);
  }
}