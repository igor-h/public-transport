import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { StationBoardComponent } from './components/pages/station-board/station-board.component';
import { ConnectionsComponent } from './components/pages/connections/connections.component';
import { AuthGuardService } from './services/auth-guard.service';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'stationboard', component: StationBoardComponent },
  { 
    path: 'connections',    // Private page with login only
    component: ConnectionsComponent,
    canActivate: [ AuthGuardService ]  // Service for block enter by link
   },
  {
    path: 'connections/:departureParam/:destinationParam',
    component: ConnectionsComponent,
    canActivate: [ AuthGuardService ]  // Service for block enter by link
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
