import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('form') registerForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.registerForm);
  }

}
