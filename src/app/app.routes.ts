import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/pages/menu/menu.component').then(m => m.MenuComponent)
  },
  {
    path: 'cuentas',
    loadComponent: () =>
      import('./transferencias/dashboard/pages/cuentas/cuentas.component').then(m => m.CuentasComponent)
  }
  // {
  //   path: 'cuentas',
  //   loadComponent: () =>
  //     import('./pages/cuentas/cuentas.component')
  //       .then(m => m.CuentasComponent)
  // }
];
