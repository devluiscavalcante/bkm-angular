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
  },
  {
    path: 'historico',
    loadComponent: () => import('./sections/history/history.component').then(m => m.HistoryComponent)
  },
  {
    path: 'sobre',
    loadComponent: () => import('./sections/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'especificacoes',
    loadComponent: () => import('./sections/specs/specs.component').then(m => m.SpecsComponent)
  }
];
