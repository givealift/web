import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('form') loginForm: NgForm;

  //TODO: find a better way to retrieve form values
  userModel: any = {};
  returnUrl: string;

  // userExists: Boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnLink'] || '';
  }


  //TODO: add some validation and test the post method
  onSubmit() {
    // if(localStorage.getItem('currentUser')){
    //   this.moveToHomePage();
    // }
    // else{
    var success = this.authService.login(this.userModel)
    if (success)
      this.routeToPath(this.returnUrl);
    else {
      this.userModel.login = '';
      this.userModel.pass = '';
      this.authService.logout(this.userModel);
      // this.userExists = false;
    }
  }
  // }

  private routeToPath(routePath: string) {
    this.router.navigate([routePath]);
  }
}
