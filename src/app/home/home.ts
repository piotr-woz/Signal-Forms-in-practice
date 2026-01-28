import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  protected readonly examples = [
    {
      id: 1,
      title: 'Basic Signal Form 1',
      description: 'Podstawowa implementacja z signal inputs',
    },
    {
      id: 2,
      title: 'Basic Signal Form 2',
      description: 'Podstawowa implementacja z signal inputs',
    },
    // {
    //   id: 3,
    //   title: 'Nested Form Groups',
    //   description: 'Zagnieżdżone grupy formularzy',
    // },
    // {
    //   id: 4,
    //   title: 'Dynamic Form Arrays',
    //   description: 'Dynamiczne tablice kontrolek',
    // },
    // {
    //   id: 5,
    //   title: 'Custom Validators',
    //   description: 'Własne walidatory z signals',
    // },
    // {
    //   id: 6,
    //   title: 'Async Operations',
    //   description: 'Asynchroniczne operacje i walidacja',
    // },
    // {
    //   id: 7,
    //   title: 'Form State Management',
    //   description: 'Zarządzanie stanem formularza',
    // },
  ];
}
