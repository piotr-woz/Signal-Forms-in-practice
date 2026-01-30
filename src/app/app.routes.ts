import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'example1',
    loadComponent: () => import('./pages/example1/example1'),
  },
  {
    path: 'example2',
    loadComponent: () => import('./pages/example2/example2'),
  },
];
