import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.css']
})
export class SubscriptionsListComponent implements OnInit {

  @Input()
  subscriptionsList: any = []; // Subscription[];

  constructor( ) {  }

  ngOnInit() {
  }

}
