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
  frontDate: string = null;
  isAnyDay: boolean = false;

  /**Copied from HomeComponent - potrzebne do searchConnections()**/
  showSpinner: boolean;
  foundRoutes: Array<Route>;
  foundNothing: boolean;
  date: FormControl;
  //routeService w constructorze
  /** **/


  /**mockup do usuniecie*/
  @Input()
  isThisMockUp: boolean;

  constructor( private subService: SubscriptionService,
               private router: Router,
               private routeService: RouteService,
               /** **/
               private dataTransferService: DataProviderService )
               /** **/
  {
      this.isDataReady = false;
      this.frontDate = null;
      this.isAnyDay = false;
      /**Copied from HomeComponent - potrzebne do searchConnections()**/
      this.showSpinner = false;
      this.foundRoutes = null;
      this.foundNothing = false;
      this.date = null;
      /** **/
  }

  ngOnInit() {

    this.setupMockData();
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
              // new FormControl(moment(), [Validators.required])
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
      /**
       * TO DO: dodać backendowe usuwanie po id subscrypcji
       * **/
      console.log("TO DO: dodać backendowe usuwanie po id subscrypcji");
      //fake: usuniecie z listy
      //this.subData.subscriptionId = "idSubskrypcji";
      this.debugLoggingDelete( true );
      if( this.isThisMockUp !== true ) {
          this.subService.delete( this.subData.subscriptionId );
      }
      this.subData = new RouteSubscription();
      this.verifyData();
  }

  buttonSearchBasedOnSubscription() {
    this.searchConnections();
  }

  searchConnections() {
      /** Copied from HomeComponent **/
      let fromCity: string = this.subData.from.name;
      let toCity: string = this.subData.to.name;
      if ( this.subData.date === null ) {
          this.date = new FormControl(moment(), [Validators.required]);
      }
      else {
          this.date = new FormControl(this.subData.date, [Validators.required]);
      }
      /** koniec podstawianych na twardo parametrów **/

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
          if ( this.isThisMockUp !== true ) {
            console.log("isThisMockUp===false");
            console.log("this.subData.subscriptionId = ", this.subData.subscriptionId);
            console.log("this.subService.delete( this.subData.subscriptionId );");
          }
          else {
            console.log("isThisMockUp===true");
            console.log("this.subData.subscriptionId = ", this.subData.subscriptionId);
            console.log("Can't delete mock-up permanently.");
          }
      }
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

  setupMockData() {
      /** Fake'owe dane
       * TO DO: zamienic i usunac
       *
       * **/
      if (this.isThisMockUp === true) {
        if (this.subData.from.cityId === 1) {
          this.subData.from.name = "Kraków";
        }
        if (this.subData.from.cityId === 2) {
          this.subData.from.name = "Warszawa";
        }
        if (this.subData.from.cityId === 3) {
          this.subData.from.name = "Łódź";
        }
        if (this.subData.from.cityId === 4) {
          this.subData.from.name = "Katowice";
        }

        if (this.subData.to.cityId === 1) {
          this.subData.to.name = "Kraków";
        }
        if (this.subData.to.cityId === 2) {
          this.subData.to.name = "Warszawa";
        }
        if (this.subData.to.cityId === 3) {
          this.subData.to.name = "Łódź";
        }
        if (this.subData.to.cityId === 4) {
          this.subData.to.name = "Katowice";
        }

        if (this.subData !== null && this.subData.subscriber !== undefined) this.subData.subscriber = "id#subskrybenta1";
      }
      /** KONIEC MOCKUPu **/
  }

}
