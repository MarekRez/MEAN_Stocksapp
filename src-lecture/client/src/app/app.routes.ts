import { Routes } from '@angular/router';
import {RegistrationComponent} from './pages/registration/registration.component';
import {ClientListComponent} from './pages/client-list/client-list.component';

export const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'client-list',
    component: ClientListComponent
  },
  {
    path: '',
    redirectTo: '/registration',
    pathMatch: 'full'
  }
];
