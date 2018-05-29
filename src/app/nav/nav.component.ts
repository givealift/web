import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { User } from "../_models";
import { UserService } from '../_services/user.service';
import { GalNotification, NewRouteNotification, ReservationNotification } from '../_models/gal-notification';
import { CitiesProvider } from '../_providers/cities-provider';
import { CityService } from '../_services/city.service';
import { MessagingService } from '../_services/messaging.service';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userId: number;
  loggedIn: boolean;

  notificationSound = new Audio("../../assets/light.ogg");

  notifications = new Array<GalNotification>();

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private messageService: MessagingService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.loggedIn = this.authService.isAuthenticated();
    this.authService.loggedInStatus.subscribe(loggedIn => {
      this.loggedIn = loggedIn
    });
    this.messageService.incomingMessenge.asObservable().subscribe(
      message => this.addNotification(message)
    );

    this.addReservationNotification();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  addNotification(message: any) {
    if (message.data.fromCityId && message.data.toCityId)
      this.addNewRouteNotification(message);
    else if (message.data.userId)
      this.addReservationNotification();

    let title: string = this.titleService.getTitle();

    let newTitle: string;

    if (title.includes('(')) {
      let notificationCount: number = parseInt(title.charAt(1));
      notificationCount++;
      newTitle = '(' + notificationCount + ') GiveALift';
    }
    else {
      newTitle = '(1) GiveALift';
    }


    this.titleService.setTitle(newTitle);
    this.notificationSound.load();
    this.notificationSound.play();

  }

  addNewRouteNotification(message: any) {
    let notification = new GalNotification();
    notification.routeId = message.data.routeId;
    let body = new NewRouteNotification;
    body.from.cityId = message.data.fromCityId;
    body.to.cityId = message.data.toCityId;
    body.from.name = message.data.fromCityName;
    body.to.name = message.data.toCityName;

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

  resetTitle() {
    this.titleService.setTitle('GiveALift');
  }
}
