import { Component, ViewChild, OnInit } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user_profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userModel: User= new User() ;
  editForm: boolean = false;
  editOrCancel =  "Edytuj";

  userId: number = parseInt(localStorage.getItem("id"));

  @ViewChild('form') form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.editOrCancel =  "Edytuj";
 //this.userService.getById(this.userId)
 //  .subscribe(user => {this.userModel = user; console.log(this.userModel)} );
// this.form.form.disable();

  }
  enableForm(){
    this.editForm = !this.editForm;
    this.editOrCancel = this.editForm ? "Edytuj" : "Anuluj";

  }



  onSubmit() {
    this.userService.update(this.userModel).subscribe(
      () => {

      },
      error => {
            console.log(error);
      }
    );

  }

}
