import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user_profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userModel: User ;
  userId: number = parseInt(localStorage.getItem("id"));

  @ViewChild('form') form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
 this.userService.getById(this.userId)
   .subscribe(user => {this.userModel = user; console.log(this.userModel)} );

  }

  onSubmit() {
    this.userService.update(this.userModel).subscribe(
      () => {

      },
      error => {

      }
    );

  }

}
