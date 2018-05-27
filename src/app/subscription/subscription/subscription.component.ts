import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  @Input()
  subData: any;

  constructor() { }

  ngOnInit() {
  }

}
