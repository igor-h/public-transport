import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { StationBoardComponent } from './components/pages/station-board/station-board.component';
import { ConnectionsComponent } from './components/pages/connections/connections.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'stationboard', component: StationBoardComponent },
  { path: 'connections', component: ConnectionsComponent },
  {
    path: 'connections/:departureParam/:destinationParam',
    component: ConnectionsComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
