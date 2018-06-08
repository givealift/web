import { Component, OnInit } from "@angular/core";
import { User } from "../../_models";
import { SubscriptionService } from "../../_services/subscription.service";
import { Router } from "@angular/router";
import { RouteSubscription, IRouteSubscription } from "../../_models/route-subscription";
import { SpinnerProvider } from "../../_providers/spinner-provider";
import { SubscriptionComponent } from "../../subscription/subscription.component";

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

    constructor(
        private subService: SubscriptionService,
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
                console.log("getUserSubscriptions error: ", error);
                this.router.navigate['user-profile'];
            }
        );
    }

    toggleAsEmptyIn( subCompOutput: SubscriptionComponent ) {
        let isFound = false;
        let isDeleted = false;
        for ( let localSub of this.usersSubs ) {
            if ( localSub.subscriptionId === subCompOutput.subData.subscriptionId ) {
                isFound = true;
                if ( subCompOutput.isDataReady === false ) {
                  let i = this.usersSubs.indexOf( subCompOutput.subData );
                  let deletedSub: Array<IRouteSubscription> = this.usersSubs.splice( i, 1 );
                  console.log("Sub successfully deleted = ", deletedSub);
                  isDeleted = true;

                  return;
                }
            }
        }
        if ( !isFound ) {
            throw new Error("Couldn't find subscription to delete.");
        }
        else {
            if ( !isFound ) {
              throw new Error("Could find but Couldn't delete subscription to delete.");
            }
        }
    }
}
