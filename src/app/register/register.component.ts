import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('form') loginForm: NgForm;


  // contain in an object?
  gender: string;
  firstname: string = 'Test';
  surname: string = 'Testingsky';
  login: string = 'test';
  email: string = 'test@testmail.com';
  pass: string = 'test';
  passConfirm: string = 'test2';
  

  @ViewChild('form') registerForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.registerForm);
  }

}
