import {CanMatchFn, Routes, UrlSegment} from '@angular/router';

export const routeHasIdAsInteger: CanMatchFn = (_, segments: UrlSegment[]) => {
  const idParam = segments[0];
  const id = Number(idParam);
  return !isNaN(id) && Number.isInteger(id);
}

export const routeHasActiveChildren: CanMatchFn = (_, segments: UrlSegment[]) => {
  return segments.length > 1;
}

export const routes: Routes = [
  {
    path: 'registration',
    loadComponent: () => import('./pages/client-create-edit/client-create-edit.component')
  },
  {
    path: 'client-list',
    loadComponent: () => import('./pages/client-list/client-list.component')
  },
  {
    path: 'edit-client',
    canMatch: [routeHasActiveChildren],
    children: [
      {
        path: ':id',
        canMatch: [routeHasIdAsInteger],
        loadComponent: () => import('./pages/client-create-edit/client-create-edit.component')
      }
    ]
  },
  {
    path: '',
    redirectTo: '/client-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component')
  }
];
