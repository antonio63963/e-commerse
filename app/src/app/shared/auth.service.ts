import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, tap } from 'rxjs';

interface User {
  id?: string;
  email: string;
  password: string;
}

interface LoginResponse {
  expiresIn: string;
  idToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user
    ).pipe(tap(this.setToken));
  }

  private setToken(response: any) {
    if (response) {
      const expData = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('fb-token-exp', expData.toDateString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const expDate = localStorage.getItem('fb-token-exp');
    if (expDate && +expDate < new Date().getTime()) {
      return null;
    } else {
      return localStorage.getItem('fb-token');
    }
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return !!this.token;
  }
}
