import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-example2',
  imports: [RouterLink, Header],
  templateUrl: './example2.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example2 {}
