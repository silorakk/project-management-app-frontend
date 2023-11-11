import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { UserForm } from '../components/user-form/types';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [CommonModule, UserFormComponent, ToastComponent],
})
export class RegisterComponent {
  #authService = inject(AuthService);
  #toastService = inject(ToastService);
  #router = inject(Router);

  registerUser(user: UserForm) {
    this.#authService
      .register(user.email, user.password)
      .subscribe((response) => {
        this.#toastService.showToast(
          'Successfully Registered!',
          'You can now login!'
        );
        this.#router.navigateByUrl('');
      });
  }
}
