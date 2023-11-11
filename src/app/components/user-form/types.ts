import { AbstractControl, FormGroup } from '@angular/forms';

export interface UserForm {
  email: string;
  password: string;
}

export type UserFormControls = { [key in keyof UserForm]: AbstractControl };
export type UserFormGroup = FormGroup & {
  value: UserForm;
  controls: UserFormControls;
};
