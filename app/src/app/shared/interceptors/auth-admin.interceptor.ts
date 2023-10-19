import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        params: new HttpParams().set('auth', this.auth.token!),
        // setParams: {
        //   auth: this.auth.token as string
        // }
      });
      console.log('token: ', this.auth.token, 'Request: ', req);
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/admin', 'login']);
        }
        return throwError(() => error);
      })
    );
  }
}

export const AUTH_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
