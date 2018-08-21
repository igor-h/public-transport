import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  formSended = false;
  usernameInput: string;
  passwordInput: string;

  constructor(public _authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    let a = this._authService.isAutentificated();

    this.loginForm = new FormGroup({
        username: new FormControl( null, Validators.required ),
        password: new FormControl( null, Validators.required )
    }, { validators: this.validateLogin('username', 'password')});
  }

  validateLogin(usernameParam: string, passwordParam: string){
    return ( group: FormGroup) => {

      let username = group.controls[usernameParam].value;
      let password = group.controls[passwordParam].value;

      // Validate with AuthService
      if ( this._authService.validateCredentials(username,password)) {
        return null;
      }

      return {
        invalidCredentials: true
      }
    }
  }

  login(){
    
    this.formSended = true;

    if(this.loginForm.invalid){
      return;
    }

    // call Login service
    this._authService.login(this.usernameInput,this.passwordInput);
    if(this._authService.isAutentificated()){
      this.router.navigate(['/home']);
    }
  }

}
