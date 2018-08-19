import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private authService: AuthService) { 
    authService.handleAuthentification();
  }

  ngOnInit() {
  }

  login(){
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }
}
