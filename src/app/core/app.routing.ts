import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home';
import { LoginComponent } from '../login';
import { AuthGuard } from '../_guards';
import { GebruikerOverzichtComponent } from '../gebruikers/gebruiker-overzicht';
import { BoekingenOverzichtComponent } from '../boeking/boekingen-overzicht';
import {MedewerkerOverzichtComponent} from '../medewerker/medewerker-overzicht/medewerker-overzicht.component';
import {KlantOverzichtComponent} from '../klant/klant-overzicht/klant-overzicht.component';
import {KlantPlanningComponent} from '../boeking/klant-planning/klant-planning.component';
import {MedewerkerPlanningComponent} from '../boeking/medewerker-planning/medewerker-planning.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'beheer-gebruikers',
    component: GebruikerOverzichtComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'beheer-medewerkers',
    component: MedewerkerOverzichtComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'beheer-klanten',
    component: KlantOverzichtComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'boekingen-overzicht',
    component: BoekingenOverzichtComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'klant-planning',
    component: KlantPlanningComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medewerker-planning',
    component: MedewerkerPlanningComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
