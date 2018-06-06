import { Component, OnInit, Input } from '@angular/core';
import { SubscriptionService } from '../_services/subscription.service';
import { Moment } from 'moment';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  @Input()
  fromCity: string;
  @Input()
  toCity: string;
  @Input()
  date: Moment;

  // html elements togglers
  dismissed = false; showSpinner = false; showInfo = false;
  alreadySubscribed = false; showAlreadySubscribed = true;


  constructor(private subscripitionService: SubscriptionService) { }

  ngOnInit() {
  }

  subscribeForAll() {
    this.date = null;
    this.subscribe();
  }
  
  subscribe() {
    this.resetState();
    this.showSpinner = true;
    this.subscripitionService
      .subscribeForNotification(this.fromCity, this.toCity, this.date)
      .subscribe(response => {
        console.log(response);
        this.showSpinner = false;
        this.showInfo = true;
        this.dismiss();
      })
  }

  resetState() {
    this.dismissed = false;
    this.showInfo = false;
  }

  dismiss = () => this.dismissed = true;
  closeInfo = () => this.showInfo = false;
  closeAlreadySubscribed = () => this.showAlreadySubscribed = false;
}
