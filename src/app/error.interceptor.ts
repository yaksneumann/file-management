import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('hello from interceptor')
  //return next(req);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMsg = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
      }
      console.error(errorMsg);
      // You can also implement a more sophisticated error handling here,
      // such as showing a toast notification or updating an error state
      return throwError(() => new Error(errorMsg));
    })
  );
};


import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class InterceptorNameInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({ 
      headers: req.headers.set('Authorization', 'Bearer YOUR_TOKEN_HERE')
    });
    
    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
