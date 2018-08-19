import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

// Rutas
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { StationBoardComponent } from './components/pages/station-board/station-board.component';
import { ConnectionsComponent } from './components/pages/connections/connections.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StationBoardComponent,
    ConnectionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
