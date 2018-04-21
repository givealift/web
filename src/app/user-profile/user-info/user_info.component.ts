import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user_info.component.css']
})
export class UserInfoComponent implements OnInit {

  userModel: User = new User();
  userCopyModel: User;
  disableForm: boolean = true;
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
    this.userService.getById(this.userId)
      .subscribe(user => {
        this.userModel = user;
        this.userCopyModel = Object.assign({}, this.userModel);
      });


  }
  enableForm(){
    this.disableForm = !this.disableForm;
    if (this.disableForm) {
      this.userModel = Object.assign({}, this.userCopyModel);
    }
    this.editOrCancel = this.disableForm ? "Edytuj" : "Anuluj";

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
