import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';

type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

@Component({
  selector: 'app-example1',
  imports: [],
  templateUrl: './example1.html',
  styleUrl: './example1.css',
})
export default class Example1 {
  private readonly userProfile = signal<UserProfile>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  protected readonly userForm = form(this.userProfile);
}
