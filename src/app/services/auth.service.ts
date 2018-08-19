import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUser: User;
  public _isAutentificated: boolean = false;
  private validUser: User = new User(   1, "user", "123456", "Mr. Traveler",true  );
  
  constructor(private router: Router) { }

  login(usernameParam: string, passwordParam: string){
    if (this.validateCredentials(usernameParam,passwordParam)){
      this._isAutentificated = true;
      this.loggedUser = this.validUser;
    }else{
      return;
    }
  }

  logout(){
    this._isAutentificated = false;
    this.router.navigate(['/home']);
  }

  isAutentificated(){
    return this._isAutentificated;
  }

  validateCredentials(usernameParam: string, passwordParam: string){
    
    if(usernameParam == this.validUser.username && 
      passwordParam == this.validUser.password){
        return true;
      }
      else{
        return false;
      }
  }

}
