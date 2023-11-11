import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../components/user-form/user-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [CommonModule, UserFormComponent],
})
export class LoginComponent {}
