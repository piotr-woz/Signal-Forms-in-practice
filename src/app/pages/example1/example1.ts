import { Component, signal, ChangeDetectionStrategy, computed } from '@angular/core';
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
} from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-example1',
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, FormField, RouterLink, MatButton],
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
  });

  private readonly _profileSchema: Schema<string> = schema((path) => {
    required(path, { message: 'This is a required field.' });
    minLength(path, 3, { message: 'This needs to be more than three characters' });
  });

  private numericOnly(path: any, options?: { message?: string }): void {
    validate(path, (ctx) => {
      const value = ctx.value();

      if (!/^\d+$/.test(String(value))) {
        return {
          kind: 'phone',
          value: true,
          message: options?.message || 'The phone must contain only numbers.',
        };
      }
      return null;
    });
  }

  protected readonly userForm = form(this._userProfile, (path) => {
    ((apply(path.firstName, this._profileSchema),
    apply(path.lastName, this._profileSchema),
    email(path.email, { message: 'The email address is not valid.' })),
      this.numericOnly(path.phone, { message: 'The phone number must contain only numbers.' }));
  });

  protected readonly isFormValid = computed(
    () =>
      this.userForm.firstName().errors().length === 0 &&
      this.userForm.lastName().errors().length === 0 &&
      this.userForm.phone().errors().length === 0 &&
      this.userForm.email().errors().length === 0,
  );
}
