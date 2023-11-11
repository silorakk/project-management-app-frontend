import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { LoginResponse, RegisterResponse, User } from './types';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ToastService } from './toast.service';

export const BASE_URL = 'http://localhost:8000';
export const TOKEN_NAME = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

  isAuthenticated = signal(this.isUserAuthenticated());
  #router = inject(Router);
  #toastService = inject(ToastService);

  #decodedToken: any;

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
      .subscribe(
        (data) => {
          if (data.body?.access_token) {
            this.setToken(data.body.access_token);
            this.isAuthenticated.set(true);
            this.#router.navigateByUrl('');
            this.#toastService.showToast(
              'Sucessfully logged in',
              'Welcome back!'
            );
          }
        },
        (error) => {
          this.#toastService.showToast(
            'Failed to login',
            'Please double check your credentials.',
            'error'
          );
        }
      );
  }

  isUserAuthenticated() {
    const token = this.getToken();
    if (token === null) return false;

    return this.isTokenExpired() ? false : true;
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  clearToken() {
    localStorage.removeItem(TOKEN_NAME);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_NAME);
    this.isAuthenticated.set(false);

    this.#router.navigateByUrl('login');
  }

  decodeToken() {
    if (this.getToken()) {
      this.#decodedToken = jwtDecode(this.getToken() ?? '');
    }
  }

  getDecodeToken() {
    return jwtDecode(this.getToken() ?? '');
  }

  getExpiryTime() {
    this.decodeToken();
    return this.#decodedToken ? this.#decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
