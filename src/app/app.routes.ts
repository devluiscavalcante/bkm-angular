import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadComponent: () => import('./sections/initial/initial.component').then(m => m.InitialComponent)
  },
  {
    path: 'backup',
    loadComponent: () => import('./sections/backup/backup.component').then(m => m.BackupComponent)
  }
];
