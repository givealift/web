import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../_models';
import {AuthService} from '../../_services/auth.service';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userModel: User = new User();
  userCopyModel: User;
  disableForm = true;
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
    this.userService.getById(this.userId)
      .subscribe(user => {
        this.userModel = user;
        this.userCopyModel = Object.assign({}, this.userModel);
      });


  }
  enableForm() {
    this.disableForm = !this.disableForm;
    if (this.disableForm) {
      this.userModel = Object.assign({}, this.userCopyModel);
    }
    this.editOrCancel = this.disableForm ? "Edytuj" : "Anuluj";

  }

  onUserChange(eventUser) {
    console.log(eventUser);
    this.userModel = eventUser;
    this.userCopyModel = Object.assign({}, this.userModel);
    this.disableForm = !this.disableForm;
    this.editOrCancel = this.disableForm ? "Edytuj" : "Anuluj";
  }

}
