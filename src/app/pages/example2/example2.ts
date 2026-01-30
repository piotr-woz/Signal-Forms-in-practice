import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-example2',
  imports: [RouterLink],
  templateUrl: './example2.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example2 {}
