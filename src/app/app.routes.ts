import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StationBoardComponent } from './components/station-board/station-board.component';
import { ConnectionsComponent } from './components/connections/connections.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'station-board', component: StationBoardComponent },
  { path: 'connections', component: ConnectionsComponent },
  //{ path: 'connections/detail/:id', component: ConnectionDetailComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
