import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

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
  config = new MatSnackBarConfig();

  constructor(private authService: AuthService, private route: ActivatedRoute, public snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];
      console.log(this.id, this.token);

    });
    this.config.extraClasses = ['gal-snack'];
    this.config.duration = 500;
  }


  changePassword() {
    this.authService.resetPassword(this.id, this.token, this.password).subscribe(
      data => this.snackBar.open('Hasło zmienione', "", this.config),
      error => {
        if (error.status == 403) {
          this.snackBar.open("Token wygasł", "", this.config);
        } else
          this.snackBar.open('OOOOPS coś poszło nie tak', "", this.config);
      }
    )
    ;


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
