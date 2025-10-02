import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            location.href = '/login';
          }
          let errorMessage = '';

          if (error.error.errors) {

            error.error.errors.forEach(errorItem => {
              errorMessage += `Functionele Code: ${errorItem.code}\nBericht: ${errorItem.description}\n`;
            });
          } else {
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error}`;
            } else {
              // server-side error
              errorMessage = `Http Code: ${error.status}\nBericht: ${error}\n`;
            }
          }

          return throwError(errorMessage);
        })
      );
  }
}
