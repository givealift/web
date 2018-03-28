import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }


  //TODO: add some validation and test the post method
  onSubmit(){
      const loginServiceUrl = '/';

      this.http.post(loginServiceUrl, {
        login: this.login,
        password: this.pass
      }).subscribe(
        response => {
          console.log(response);
        });
    }
}
