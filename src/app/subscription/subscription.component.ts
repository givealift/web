import { Component, Input, OnInit } from '@angular/core';
import { RouteSubscription, IRouteSubscription } from "../_models/route-subscription";
import { isNullOrUndefined } from "util";
import { SubscriptionService } from "../_services/subscription.service";
import { Router } from "@angular/router";
import { RouteService } from "../_services/route.service";
import { Route } from "../_models/index";
import * as moment from "moment";
import { FormControl, Validators } from "@angular/forms";
import { DataProviderService } from "../_services/data-provider.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

    @Input()
    subData: IRouteSubscription;

    isDataReady: boolean = false;
    foundRoutes: Array<Route>;
    foundNothing: boolean;
    date: FormControl;
    frontDate: string = null;
    isAnyDay: boolean = false;
    showSpinner: boolean;
    showSpinner2: boolean = false;

    constructor( private subService: SubscriptionService,
                 private router: Router,
                 private routeService: RouteService,
                 private dataTransferService: DataProviderService )
    {
        this.isDataReady = false;
        this.foundRoutes = null;
        this.foundNothing = false;
        this.date = null;
        this.frontDate = null;
        this.isAnyDay = false;
        this.showSpinner = false;
        this.showSpinner2 = false;
    }

    ngOnInit() {
        this.verifyData();
        this.debugLogging();
    }

    verifyData() {
        if ( !isNullOrUndefined(this.subData)
          && !isNullOrUndefined(this.subData.subscriber)
          && !isNullOrUndefined(this.subData.from.cityId) && !isNullOrUndefined(this.subData.to.cityId)
          && !isNullOrUndefined(this.subData.from.name) && !isNullOrUndefined(this.subData.to.name)
          && this.subData.notificationType === "PUSH"
          && this.subData.date !== undefined )
        {
            if ( this.subData.date === null ) {
                this.frontDate = moment().format('YYYY-MM-DD');
                this.isAnyDay = true;
            }
            else {
                this.frontDate = this.subData.date;
            }

            this.isDataReady = true;
        }
        else {
            this.isDataReady = false;
        }
    }

    buttonRemoveSubscription() {
        this.debugLoggingDelete();
        this.showSpinner2 = true;
        this.subService.delete( this.subData.subscriptionId ).subscribe(
            response => {
                console.log("successful deletion: ", response);
                this.showSpinner2 = false;
            },
            error => {
                console.log("error during deletion: ", error);
                this.showSpinner2 = false;
            }
        );
        this.subData = new RouteSubscription();
        this.verifyData();
    }

    buttonSearchBasedOnSubscription() {
        this.searchConnections();
    }

    searchConnections() {
        let fromCity: string = this.subData.from.name;
        let toCity: string = this.subData.to.name;
        if ( this.subData.date === null ) {
            this.date = new FormControl(moment(), [Validators.required]);
        }
        else {
            this.date = new FormControl(this.subData.date, [Validators.required]);
        }

        this.showSpinner = true;
        this.foundRoutes = null;
        this.foundNothing = false;
        this.routeService
            .search(fromCity, toCity, this.date.value)
            .subscribe(routes => {
                this.foundRoutes = routes;
                console.log("routes = ", routes);
                if ( isNullOrUndefined(routes) || routes.length === 0 ) {
                    this.foundNothing = true;
                    this.showSpinner = false;
                    this.debugLoggingSearch();
                    return;
                } else {
                    const dateString = moment(this.date.value).format('YYYY-MM-DD');
                    const resultsTag = this.dataTransferService.taggedResults(routes[0].from.date.cityId, routes[0].to.date.cityId, dateString);

                    this.dataTransferService.storeData(`route-list/${resultsTag}`, routes);
                    this.router.navigate([`/route-list`], { queryParams: { from: routes[0].from.city.cityId, to: routes[0].to.city.cityId, date: dateString } });
                    this.showSpinner = false;
                    this.debugLoggingSearch();
                }
            }, err => {
              this.showSpinner = false;
            });
    }

    debugLoggingDelete( isLoggingOn: boolean = false ) {
        /** debug logging **/
        if (isLoggingOn) {
            console.log("this.subData.subscriptionId = ", this.subData.subscriptionId);
            console.log("Can't delete mock-up permanently.");
        }
        /** **/
    }

    debugLoggingSearch( isLoggingOn: boolean = false ) {
        /** debug logging **/
        if( isLoggingOn ) {
            if ( this.subData.date === null ) {
              console.log("subData.date === ", this.subData.date, "\n==>\ndate=", this.date);
            }
            if( this.foundNothing ) {
              console.log("foundNoConnections\nfoundRoutes = ", this.foundRoutes);
            }
            else {
              console.log("foundSomeConnections\nfoundRoutes = ", this.foundRoutes);
            }
            console.log("dateString = ", moment(this.date.value).format('YYYY-MM-DD') );
        }
        /** **/
    }

    debugLogging( isLoggingOn: boolean = false ) {
        /** DEBUG logging **/
        if (isNullOrUndefined(this.subData)) {
          console.log("FALSE: subData=undefined/null=", this.subData);
        }
        if (isNullOrUndefined(this.subData.subscriber)) {
          console.log("FALSE: subscriber=undefined/null=", this.subData.subscriber);
        }
        if (isNullOrUndefined(this.subData.from.cityId)) {
          console.log("FALSE: from=undefined/null=", this.subData.from.cityId);
        }
        if (isNullOrUndefined(this.subData.from.name)) {
          console.log("FALSE: from=undefined/null=", this.subData.from.name);
        }
        if (isNullOrUndefined(this.subData.to.cityId)) {
          console.log("FALSE: from=undefined/null=", this.subData.to.cityId);
        }
        if (isNullOrUndefined(this.subData.to.name)) {
          console.log("FALSE: to=undefined/null=", this.subData.to.name);
        }
        if (this.subData.notificationType === "PUSH") { /*console.log("notificationType==\"PUSH\"=", this.subData.notificationType);*/
        }
        else {
          console.log("FALSE: notificationType!=\"PUSH\"=", this.subData.notificationType);
        }
        if (this.subData.date === undefined ) {
          console.log("FALSE: date=undefined", this.subData.date);
        }
        console.log("isDataReady = ", this.isDataReady);
        console.log("subData = ", this.subData);
        /** **/
    }
}
