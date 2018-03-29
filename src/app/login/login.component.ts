import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  returnUrl: string;

  // userExists: Boolean = true;

  constructor(
      private route: ActivatedRoute,
      private http: HttpClient, 
      private authService: AuthService, 
      private router: Router) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnLink'] || '';
  }


  //TODO: add some validation and test the post method
  onSubmit(){
      // if(localStorage.getItem('currentUser')){
      //   this.moveToHomePage();
      // }
      // else{
        var success = this.authService.login(this.login, this.pass)
        if(success)
          this.moveToPage(this.returnUrl);
        else{
          this.login = '';
          this.pass = '';
          this.authService.logout(this.login, this.pass);
          // this.userExists = false;
        }
      }
    // }

    private moveToPage(routePath: string){
      this.router.navigate([routePath]);
    }
  }
