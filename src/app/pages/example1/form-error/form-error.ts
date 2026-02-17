import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: '[app-form-error]',
  imports: [],
  template: `@if (control().invalid() && control().touched()) {
    @for (error of control().errors(); track error.kind) {
      <span>{{ error.message }}</span>
    }
  }`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormError {
  public readonly control = input.required<any>();
}
