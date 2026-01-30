import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
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
  ],
  templateUrl: './example1.html',
  styleUrl: './example1.css',
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

  private readonly _profileSchema: Schema<string> = schema((path) => {
    required(path, { message: 'This is a required field.' });
    minLength(path, 3, { message: 'This needs to be more than three characters' });
  });

  private numericOnly(path: any, options?: { message?: string }): void {
    validate(path, (input) => {
      const value = input.value();

      if (!/^\d+$/.test(String(value))) {
        return {
          kind: 'phone',
          message: options?.message || 'This input must contain only numbers.',
        };
      }
      return null;
    });
  }

  protected readonly userForm = form(this._userProfile, (path) => {
    (apply(path.firstName, this._profileSchema),
      apply(path.lastName, this._profileSchema),
      this.numericOnly(path.phone, { message: 'The phone number must contain only numbers.' }),
      required(path.email, {
        when: ({ valueOf }) => valueOf(path.emailMarketing) === true,
        message: 'This is a required field.',
      }),
      email(path.email, { message: 'The email address is not valid.' }));
  });

  onSubmit() {
    // event.preventDefault();
    submit(this.userForm, async () => {
      try {
        this.userForm().reset();
        return undefined;
      } catch (error) {
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

  // onSubmit() {
  //   submit(this.userForm, async (form) => {
  //     try {
  //       this.userProfileService.saveForm(form); // call to API to save our form data
  //       this.userForm().reset();
  //       return undefined;
  //     }
  //   });
  // }
}
