import { Component, OnInit } from '@angular/core';
import { User } from "../../_models";
import { SubscriptionService } from "../../_services/subscription.service";
import { Router } from "@angular/router";
import { RouteSubscription, IRouteSubscription } from "../../_models/route-subscription";
<<<<<<< HEAD
import { SpinnerProvider } from "../../_providers/spinner-provider";
=======
import { SpinnerProvider } from '../../_providers/spinner-provider';
>>>>>>> 610d13638204bf151d179c8b925e98feb2f23bc2

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

    constructor(private subService: SubscriptionService,
        private router: Router,
        private spinnerProvider: SpinnerProvider
    ) {
        this.user = new User();
        this.tmpSub = new RouteSubscription();
        this.usersSubs = new Array<RouteSubscription>();
        this.isDataReady = false;
    }

    ngOnInit() {
        this.user.userId = parseInt(localStorage.getItem("id"));
        setTimeout(() => this.spinnerProvider.open());
        this.subService.getUserSubscriptions(this.user.userId.toString()).subscribe(
            subscriptions => {
                for (let oneSub of subscriptions) {
                    this.usersSubs.push(oneSub);
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
}
