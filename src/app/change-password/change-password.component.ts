import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password: string;
  passConfirm: string;
  token: string;
  id: string;
  sub: Subscription;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];
      console.log(this.id, this.token);

    });
  }


  changePassword() {
    this.authService.changePassword(this.id, this.token, this.password).subscribe();


  }


}
