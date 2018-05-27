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
  
  
  constructor(private subscripitionService: SubscriptionService) { }

  ngOnInit() {
  }

  subscribe() {
    console.log(this.fromCity, this.toCity, this.date);
  }

  cancel() {
  }

}
