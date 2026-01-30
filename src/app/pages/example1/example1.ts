import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  form,
  FormField,
  required,
  email,
  Schema,
  schema,
  minLength,
  apply,
  validate,
  submit,
} from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/components/header/header';

interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  emailMarketing: boolean;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-example1',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButton,
    MatCheckbox,
    FormField,
    RouterLink,
    Header,
  ],
  templateUrl: './example1.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example1 {
  private readonly _userProfile = signal<UserProfile>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    emailMarketing: false,
    password: '',
    confirmPassword: '',
  });

  // Reusable schema for first name and last name fields
  private readonly _profileSchema: Schema<string> = schema((path) => {
    required(path, { message: 'This is a required field.' });
    minLength(path, 3, { message: 'This needs to be more than three characters' });
  });

  // Custom validator to allow only numeric input
  private numericOnly(path: any, options?: { message?: string }): void {
    validate(path, ({ value }) => {
      if (!/^\d+$/.test(String(value()))) {
        return {
          message: options?.message || 'This input must contain only numbers.',
          kind: 'phone',
        };
      }
      return null;
    });
  }

  protected readonly userForm = form(this._userProfile, (path) => {
    (apply(path.firstName, this._profileSchema),
      apply(path.lastName, this._profileSchema),
      // Phone number must contain only numbers
      this.numericOnly(path.phone, { message: 'The phone number must contain only numbers.' }),
      // Email is required only if email marketing is checked
      required(path.email, {
        when: ({ valueOf }) => valueOf(path.emailMarketing) === true,
        message: 'This is a required field.',
      }),
      email(path.email, { message: 'The email address is not valid.' }),
      // Password must contain at least one number
      validate(path.password, ({ value }) => {
        if (!/\d/.test(String(value()))) {
          return { message: 'Password must contain at least one number.', kind: 'password' };
        }
        return null;
      }),
      // Confirm password must match password
      validate(path.confirmPassword, ({ value, valueOf }) => {
        if (value() !== valueOf(path.password)) {
          return { message: 'Passwords do not match.', kind: 'confirmPassword' };
        }
        return null;
      }));
  });

  protected onSubmit() {
    // event.preventDefault();
    submit(this.userForm, async () => {
      try {
        this.userForm().reset();
        return undefined;
      } catch (error) {
        // Simulate server error for first name field
        return [
          {
            kind: 'server',
            field: this.userForm.firstName,
            message: (error as Error).message,
          },
        ];
      }
    });
  }

  // protected onSubmit() {
  //   submit(this.userForm, async (form) => {
  //     try {
  //       this.userProfileService.saveForm(form); // call to API to save our form data
  //       this.userForm().reset();
  //       return undefined;
  //     }
  //   });
  // }
}
