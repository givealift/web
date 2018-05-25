import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { User } from "../_models";
import { UserService } from '../_services/user.service';
import { GalNotification, NewRouteNotification, ReservationNotification } from '../_models/gal-notification';
import { CitiesProvider } from '../_providers/cities-provider';
import { CityService } from '../_services/city.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userId: number;
  loggedIn: boolean;

  notifications = new Array<GalNotification>();

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cityService: CityService
  ) { }

  ngOnInit() {
    this.loggedIn = this.authService.isAuthenticated();
    this.authService.loggedInStatus.subscribe(loggedIn => {
      this.loggedIn = loggedIn
    });

    this.addNewRouteNotification();
    this.addReservationNotification();
    this.addNewRouteNotification();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  addNewRouteNotification() {
    let notification = new GalNotification();
    notification.routeId = 112;
    let body = new NewRouteNotification;
    this.cityService.searchCity("Warszawa").subscribe(
      city => body.from = city
    );
    this.cityService.searchCity("Kraków").subscribe(
      city => body.to = city
    );
    body.date = new Date();
    notification.newRoute = body;

    this.notifications.push(notification);
  }

  addReservationNotification() {
    let notification = new GalNotification();
    notification.routeId = 112;
    let body = new ReservationNotification;
    body.userId = parseInt(localStorage.getItem('id'));
    notification.reservation = body;

    this.notifications.push(notification);
  }
}
