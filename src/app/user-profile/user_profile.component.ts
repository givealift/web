import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user_profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userModel: User = new User();
  editForm: boolean = false;
  editOrCancel = "Edytuj";

  userId: number = parseInt(localStorage.getItem("id"));

  @ViewChild('form') form: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    //this.userService.getById(this.userId)
    //  .subscribe(user => {this.userModel = user; console.log(this.userModel)} );
    // this.form.form.disable();

  }
  enableForm() {
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
