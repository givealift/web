import { Component, OnInit } from '@angular/core';
import { User } from "../../_models";
import { SubscriptionService } from "../../_services/subscription.service";
import { Router } from "@angular/router";
import { RouteSubscription, IRouteSubscription } from "../../_models/route-subscription";
import { SpinnerProvider } from '../../_providers/spinner-provider';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {

  user: User;
  tmpSub: IRouteSubscription;
  usersSubs: Array<IRouteSubscription>;
  isDataReady: boolean;

  /** mockup - do usuniecie **/
  isThisMockUp: Array<boolean>;

  constructor( private subService: SubscriptionService,
               private router: Router,
               private spinnerProvider: SpinnerProvider
  )
  {
      this.user = new User();
      this.tmpSub = new RouteSubscription();
      this.usersSubs = new Array<RouteSubscription>();
      this.isDataReady = false;

      /** do usuniecia **/
      this.isThisMockUp = new Array<boolean>();
  }

  ngOnInit() {
      //this.setupMockData();

      this.user.userId = parseInt( localStorage.getItem("id") );
      setTimeout(() => this.spinnerProvider.open());
      this.subService.getUserSubscriptions( this.user.userId.toString() ).subscribe(
      subscriptions => {
          for( let oneSub of subscriptions ) {
              this.usersSubs.push( oneSub );
              this.isThisMockUp.push( false ); /** do usuniecia **/
              console.log("oneSub = ", oneSub);
          }
          console.log("userSubs = ", this.usersSubs);
          this.spinnerProvider.close();
          this.isDataReady = true;
          },
      error => {
          this.spinnerProvider.close();
          console.log("getUserSubscriptions error: ", error)
          this.router.navigate['user-profile'];
      }
      );
  }

  setupMockData() {
      /** zamockowane dane
       * TO DO: usunac
       * **/
      if( this.usersSubs.length === 0 ) {
          this.usersSubs = new Array<RouteSubscription>();

          this.isThisMockUp = new Array<boolean>();     /** do usuniecia **/

          this.tmpSub.date = "2018-06-25T23:30:00.259Z";
          this.tmpSub.email = "user1@gmail.pl";
          this.tmpSub.from.cityId = 1;
          this.tmpSub.to.cityId = 2;
          this.tmpSub.notificationType = "PUSH";
          this.tmpSub.subscriber = "#idSubskrybenta";
          //this.tmpSub.routeId = 105;
          this.usersSubs.push( this.tmpSub );
          this.isThisMockUp.push( true );                /** do usuniecia **/

          this.tmpSub = new RouteSubscription();
          this.tmpSub.date = "2018-06-25T23:30:00.259Z";
          this.tmpSub.email = "user1@gmail.pl";
          this.tmpSub.from.cityId = 1;
          this.tmpSub.to.cityId = 2;
          this.tmpSub.notificationType = "BOT";
          this.tmpSub.subscriber = "#idSubskrybenta";
          //this.tmpSub.routeId = 105;
          this.usersSubs.push( this.tmpSub );
          this.isThisMockUp.push( true );                /** do usuniecia **/

          this.tmpSub = new RouteSubscription();
          this.tmpSub.date = "2018-06-30T23:45:00.259Z";
          this.tmpSub.email = "user1@gmail.pl";
          this.tmpSub.from.cityId = 3;
          this.tmpSub.to.cityId = 4;
          this.tmpSub.notificationType = "PUSH";
          this.tmpSub.subscriber = "#idSubskrybenta";
          //this.tmpSub.routeId = 105;
          this.usersSubs.push( this.tmpSub );
          this.isThisMockUp.push( true );                /** do usuniecia **/

          this.tmpSub = new RouteSubscription();
          this.tmpSub.date = "2018-06-30T23:45:00.259Z";
          this.tmpSub.email = "user1@gmail.pl";
          this.tmpSub.from.cityId = 3;
          this.tmpSub.to.cityId = 4;
          this.tmpSub.notificationType = "BOT";
          this.tmpSub.subscriber = "#idSubskrybenta";
          //this.tmpSub.routeId = 105;
          this.usersSubs.push( this.tmpSub );
          this.isThisMockUp.push( true );                /** do usuniecia **/

          this.tmpSub = new RouteSubscription();
          this.tmpSub.date = null;
          this.tmpSub.email = "user1@gmail.pl";
          this.tmpSub.from.cityId = 1;
          this.tmpSub.to.cityId = 4;
          this.tmpSub.notificationType = "PUSH";
          this.tmpSub.subscriber = "#idSubskrybenta";
          //this.tmpSub.routeId = 105;
          this.usersSubs.push( this.tmpSub );
          this.isThisMockUp.push( true );                /** do usuniecia **/

          console.log("STILL MOCKUP\nuserSubs = mockup");
          console.log("userSubs = ", this.usersSubs);
      }

      /** KONIEC MOCKUPu **/
  }
}
