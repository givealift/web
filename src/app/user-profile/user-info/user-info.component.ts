import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../_models';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  user: User = new User();

  userId: number;

  @ViewChild('form') form: NgForm;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.route.params.subscribe(
      param => this.userId = param.id,
      error => this.router.navigate['home']
    );
    this.userService.getById(this.userId).subscribe(user => {
      if (user != null) {
        this.user = user;
      }
      else {
        this.router.navigate['home'];
      }
    });
  }

}
