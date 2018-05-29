import { Component, OnInit, Input } from '@angular/core';
import { GalNotification } from '../_models/gal-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  @Input()
  notification: GalNotification = new GalNotification();

  constructor(private router: Router) { }


  routeToUrl() {
    if (this.notification)
      this.router.navigate([`/route/${this.notification.routeId}`]);
  }

}
