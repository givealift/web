import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('form') loginForm: NgForm;
  
  //TODO: find a better way to retrieve form values
  login = '';
  pass = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }


  //TODO: add some validation and test the post method
  onSubmit(){
      if(this.authService.loggedIn){
        this.moveToHomePage();
      }
      else{
        var success = this.authService.login(this.login, this.pass)
        if(success)
          this.moveToHomePage();
      }
    }

    private moveToHomePage(){
      this.router.navigate(['']);
    }
}
