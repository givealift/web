import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // contain in an object?
  userModel: any = {};

  @ViewChild('form') registerForm: NgForm;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.userModel);
    this.userService.create(this.userModel);
    
  }

}
