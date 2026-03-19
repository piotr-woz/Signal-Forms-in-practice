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
  SchemaPath,
} from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { FormError } from './form-error/form-error';

interface UserProfileModel {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  emailMarketing: boolean;
  password: string;
  confirmPassword: string;
}

const userProfileInitialState: UserProfileModel = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  emailMarketing: false,
  password: '',
  confirmPassword: '',
};

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
    FormError,
  ],
  templateUrl: './example1.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example1 {
  protected readonly userProfile = signal<UserProfileModel>(userProfileInitialState);

  // Reusable schema for first name and last name fields
  private readonly _profileSchema: Schema<string> = schema((path) => {
    required(path, { message: 'This is a required field.' });
    minLength(path, 3, { message: 'This needs to be more than three characters' });
  });

  // Custom validator to allow only numeric input
  private numericOnly(path: SchemaPath<string>, options?: { message?: string }): void {
    validate(path, ({ value }) => {
      const phoneNumber = value();
      if (!phoneNumber) return null;

      const isValid = /^\d+$/.test(phoneNumber);
      return isValid
        ? null
        : {
            message: options?.message || 'This input must contain only numbers.',
            kind: 'phone',
          };
    });
  }

  protected readonly userForm = form(this.userProfile, (path) => {
    /* firstName and lastName validation */
    (apply(path.firstName, this._profileSchema),
      apply(path.lastName, this._profileSchema),
      /* phone validation */
      // phone number must contain only numbers
      this.numericOnly(path.phone, { message: 'The phone number must contain only numbers.' }),
      /* email validation */
      // email is required only if email marketing is checked
      required(path.email, {
        when: ({ valueOf }) => valueOf(path.emailMarketing) === true,
        message: 'This is a required field.',
      }),
      email(path.email, { message: 'The email address is not valid.' }),
      /* password validation */
      // password must contain at least one number, one special character and one uppercase letter (custom validator)
      validate(path.password, ({ value }) => {
        const password = value();
        if (!password) return null;

        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasUpper = /[A-Z]/.test(password);

        if (!hasNumber) {
          return { message: 'Password must contain at least one number.', kind: 'password' };
        }
        if (!hasSpecial) {
          return {
            message: 'Password must contain at least one special character.',
            kind: 'password',
          };
        }
        if (!hasUpper) {
          return {
            message: 'Password must contain at least one uppercase letter.',
            kind: 'password',
          };
        }

        return null;
      }),
      // Password must be at least 8 characters long
      minLength(path.password, 8, {
        message: (password) =>
          `Password should have at least 8 characters but has only ${password.value().length}`,
      }),
      // Confirm password must match password (custom validator)
      validate(path.confirmPassword, ({ value, valueOf }) => {
        return value() !== valueOf(path.password)
          ? { message: 'Passwords do not match.', kind: 'confirmPassword' }
          : null;
      }));
  });

  constructor() {
    this.userForm.firstName().value.set('Peter');
    console.log(this.userForm().value());
  }

  protected async onSubmit(event: SubmitEvent) {
    event.preventDefault();
    await submit(this.userForm, async (form) => {
      // async logic that returns ise of either undefined (success) or array of errors
      try {
        // await this.userService.saveForm(form().value()); // call to API to save our form data (example)
        form().reset(userProfileInitialState);
        return undefined;
      } catch (error) {
        // simulate server error for first name field
        return [
          {
            kind: 'server',
            message: (error as Error).message,
            fieldTree: form.firstName,
          },
        ];
      }
    });
    // 👇 automatically focus the first field with an error
    const firstError = this.userForm().errorSummary()[0];
    if (firstError?.fieldTree) {
      firstError.fieldTree().focusBoundControl();
    }
  }

  /* with fetch */
  // protected async onSubmit(event: SubmitEvent) {
  //   event.preventDefault();
  //   await submit(this.userForm, async (form) => {
  //     try {
  //       await fetch('https://api.example.com/user-profile', {
  //         method: 'PUT',
  //         body: JSON.stringify(form().value()),
  //       });
  //       form().reset(userProfileInitialState);
  //       return undefined;
  //     }
  //   });
  // }
}

/*
Built-in validators include:

required(path)
min(path, minValue)
max(path, maxValue)
minLength(path, length)
maxLength(path, length)
pattern(path, regex) ...for example pattern(path.zip, new RegExp("[0-9]{5}"))
email(path)
 */

/*
In custom validation, ctx object gives access to:

ctx.value() - current field value
ctx.valueOf(path) - value of another field
ctx.state() - touched/dirty state
ctx.stateOf(path) - state of another field
 */

/*
We can access all individual fields from our form:
  this.userForm.firstName().value.set("Peter");

We can access the state of individual fields, such as valid / pristine / touched / disabled / errors, and more:
  this.userForm.phone().dirty();

And we can also acccess that information on the entire form
  this.userForm().value(); // returns the entire form value
  this.userForm().valid(); // returns true or false
 */
