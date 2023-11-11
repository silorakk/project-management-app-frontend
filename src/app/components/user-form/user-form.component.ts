import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserForm, UserFormControls, UserFormGroup } from './types';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Input({ required: true }) isLogin: boolean = true;
  @Output() formSubmitted = new EventEmitter<UserForm>();

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  } as UserFormControls) as UserFormGroup;

  onSubmit() {
    this.formSubmitted.emit(this.userForm.value);
  }
}
