import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';
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

  protected readonly userForm = form(this._userProfile, (path) => {
    (required(path.firstName, { message: 'This is a required field.' }),
      required(path.lastName, { message: 'This is a required field.' }),
      email(path.email, { message: 'The email address is not valid.' }));
  });
}
