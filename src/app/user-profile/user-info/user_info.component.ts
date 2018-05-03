import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../_models';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user_info.component.css']
})
export class UserInfoComponent implements OnInit {

  userModel: User = new User();

  userId: number;

  @ViewChild('form') form: NgForm;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.route.params.subscribe(
      param => this.userId = param.id,
      error => this.router.navigate['home']
    );
  }

  ngOnInit() {
    this.userService.getById(this.userId)
      .subscribe(
        user => {
          this.userModel = user;
          console.log(user);
        },
        error => {
          this.router.navigate[''];
        });
  }

}
