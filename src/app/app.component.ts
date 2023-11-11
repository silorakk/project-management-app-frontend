import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  #authService = inject(AuthService);
  isLoggedIn = this.#authService.isAuthenticated;

  logout() {
    this.#authService.logout();
  }
}
