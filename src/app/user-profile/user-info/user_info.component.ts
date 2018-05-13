import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../_models';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user_info.component.css']
})
export class UserInfoComponent {

  @Input()
  user: User = new User();

  userId: number;

  @ViewChild('form') form: NgForm;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.route.params.subscribe(
      param => this.userId = param.id,
      error => this.router.navigate['home']
    );
    let possibleUser = this.userService.getById(this.userId);

    if (possibleUser != null) {
      this.user = possibleUser;
      console.log(possibleUser);
    }
    else {
      this.router.navigate['home'];
    }
  }

}
