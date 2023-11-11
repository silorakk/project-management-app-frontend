import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { LoginResponse, RegisterResponse, User } from './types';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export const BASE_URL = 'http://localhost:8000';
export const TOKEN_NAME = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

  isAuthenticated = signal(this.getToken() !== null);
  #router = inject(Router);

  register(email: string, password: string) {
    return this.#http.post<RegisterResponse>(
      BASE_URL + '/auth/register',
      {
        email,
        password,
      },
      { observe: 'response' }
    );
  }

  getUser() {
    return this.#http.get<User>(BASE_URL + '/users/me');
  }

  login(email: string, password: string) {
    return this.#http
      .post<LoginResponse>(
        BASE_URL + '/auth/login',
        {
          email,
          password,
        },
        { observe: 'response' }
      )
      .subscribe((response) => {
        if (response.body?.access_token) {
          this.setToken(response.body.access_token);
          this.isAuthenticated.set(true);
          this.#router.navigateByUrl('');
        }
      });
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_NAME);
    this.isAuthenticated.set(false);

    this.#router.navigateByUrl('login');
  }
}
