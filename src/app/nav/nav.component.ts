import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { User } from "../_models";
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userId: number;
  loggedIn: boolean;

  notifications = new Array<any>();

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.authService.isAuthenticated();
    this.authService.loggedInStatus.subscribe(loggedIn => {
      this.loggedIn = loggedIn
    });

    this.notifications.push('a');
    this.notifications.push('a');
    this.notifications.push('a');
    this.notifications.push('a');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
