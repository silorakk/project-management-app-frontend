import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterResponse } from './types';

const BASE_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

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
}
