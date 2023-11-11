import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../services/types';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  #authService = inject(AuthService);

  isLoggedIn = this.#authService.isAuthenticated;
  user$: Observable<User | null> = of(null);

  constructor() {
    effect(() => {
      this.user$ = this.#authService.getUser();
      console.log('effect test', this.isLoggedIn());
    });
  }
}
