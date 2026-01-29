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
} from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

@Component({
  selector: 'app-example1',
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, FormField, RouterLink],
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

  protected readonly userForm = form(this._userProfile, (path) => {
    (apply(path.firstName, this._profileSchema),
      apply(path.lastName, this._profileSchema),
      email(path.email, { message: 'The email address is not valid.' }));
  });
}
