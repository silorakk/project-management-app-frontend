import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { UserForm } from '../components/user-form/types';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [CommonModule, UserFormComponent],
})
export class LoginComponent {
  #authService = inject(AuthService);
  #toastService = inject(ToastService);

  login(userForm: UserForm) {
    this.#authService.login(userForm.email, userForm.password);
    this.#toastService.showToast('Sucessfully logged in', 'Welcome back!');
  }
}
