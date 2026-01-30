import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public readonly pageTitle = signal<string>('');
  public readonly originLink = signal<string>('');

  setPageData(title: string, origin: string): void {
    this.pageTitle.set(title);
    this.originLink.set(origin);
  }
}
