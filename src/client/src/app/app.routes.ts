import { Routes } from '@angular/router';
import {HomeComponent} from './pages/1home/home.component';
import {AddClientComponent} from './pages/2add-client/add-client.component';
import {ClientListComponent} from './pages/3client-list/client-list.component';
import {PortfolioComponent} from './pages/4portfolio/portfolio.component';
import {AccountsComponent} from './pages/5accounts/accounts.component';
import {InvestingComponent} from './pages/6investing/investing.component';

export const routes: Routes = [
  { path: "",
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: "home",
    component: HomeComponent,
  },
  { path: "add-client",
    component: AddClientComponent,
  },
  { path: "client-list",
    component: ClientListComponent,
  },
  { path: "portfolio",
    component: PortfolioComponent,
  },
  { path: "accounts",
    component: AccountsComponent,
  },
  { path: "investing",
    component: InvestingComponent,
  },
];
