import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../components/user-form/user-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [CommonModule, UserFormComponent],
})
export class RegisterComponent {}
