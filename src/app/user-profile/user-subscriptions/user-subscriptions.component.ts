import { Component, OnInit } from '@angular/core';
import { User } from "../../_models";
import { SubscriptionService } from "../../_services/subscription.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {

  user: User = new User();
  usersSubs: any = [];
  tmpSub: any;
  isDataReady: boolean = false;

  constructor( private subService: SubscriptionService,
               private router: Router) { }

  ngOnInit() {
    this.user.userId = parseInt( localStorage.getItem("id") );

    this.subService.getUserSubscriptions( this.user.userId.toString() ).subscribe(
         route => {
           this.tmpSub = route;
           if ( this.usersSubs.length !== 0 ) {
              this.usersSubs.push( this.tmpSub );
           } else {
             this.usersSubs.next( this.tmpSub );
           }
           this.isDataReady = true;
         },
         error => {
           this.router.navigate['user-profile'];
         }
    );

    console.log("userSubs = ", this.usersSubs);

    /** zamockowane nada
     * TO DO: usunac
     * **/
    this.usersSubs = [
      {'date':"2018-06-25T23:30:00.259Z", 'email': "user1@gmail.pl", 'fromCityId': 1, 'notificationType':"POST", 'subscriber':"101", 'toCityId':2},
      {'date':"2018-06-25T23:30:00.259Z", 'email': "user1@gmail.pl", 'fromCityId': 1, 'notificationType':"BOT", 'subscriber':"101", 'toCityId':2},
      {'date':"2018-06-26T23:45:00.259Z", 'email': "user2@gmail.pl", 'fromCityId': 3, 'notificationType':"POST", 'subscriber':"101", 'toCityId':4},
      {'date':"2018-06-26T23:45:00.259Z", 'email': "user2@gmail.pl", 'fromCityId': 3, 'notificationType':"BOT", 'subscriber':"101", 'toCityId':4}
    ];
    console.log("STILL MOCKUP\nuserSubs = mockup");
    console.log("userSubs = ", this.usersSubs);

  }

}
