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
      description:
        'Basic implementation with Angular Material, featuring built-in and custom validation.',
    },
    {
      id: 2,
      title: 'Basic Signal Form 2',
      description: 'Basic implementation with Signal inputs.',
    },
    {
      id: 3,
      title: 'Basic Signal Form 3',
      description: 'Basic implementation with Signal inputs.',
    },
  ];
}
