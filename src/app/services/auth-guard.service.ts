import { Injectable } from '@angular/core';
import { 
        Router, 
        ActivatedRouteSnapshot, 
        RouterStateSnapshot,
        CanActivate 
      } from '@angular/router';

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor( private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    console.log(next);


    if (this.authService.isAutentificated()){
      console.log("Auth is OK");
      return true;
    }else{
      console.error("Page blocked by guard! Please Log in");
      this.router.navigate(['/home']);
      return false;
    }
  }
}
