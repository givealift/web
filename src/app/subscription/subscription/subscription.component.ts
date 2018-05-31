import { Component, Input, OnInit } from '@angular/core';
import { IRouteSubscription } from "../../_models/route-subscription";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  @Input()
  subData: IRouteSubscription;
  isDataReady: boolean = false;

  /**mockup do usuniecie*/
  @Input()
  isThisMockUp: boolean;

  constructor() { this.isDataReady = false; }

  ngOnInit() {
    /** Fake'owe dane
     * TO DO: zamienic i usunac
     *
     * **/
    if ( this.isThisMockUp === true ) {
        if ( this.subData.from.cityId === 1 ) { this.subData.from.name = "Kraków"; }
        if ( this.subData.from.cityId === 2 ) { this.subData.from.name = "Warszawa"; }
        if ( this.subData.from.cityId === 3 ) { this.subData.from.name = "Łódź"; }
        if ( this.subData.from.cityId === 4 ) { this.subData.from.name = "Katowice"; }

        if ( this.subData.to.cityId === 1 ) { this.subData.to.name = "Kraków"; }
        if ( this.subData.to.cityId === 2 ) { this.subData.to.name = "Warszawa"; }
        if ( this.subData.to.cityId === 3 ) { this.subData.to.name = "Łódź"; }
        if ( this.subData.to.cityId === 4 ) { this.subData.to.name = "Katowice"; }

        if ( this.subData!== null && this.subData.subscriber !== undefined ) this.subData.subscriber = "id#subskrybenta1";
    }
    /** KONIEC MOCKUPu **/

    if ( !isNullOrUndefined( this.subData )
      && !isNullOrUndefined( this.subData.subscriber )
      && !isNullOrUndefined( this.subData.from.cityId ) && !isNullOrUndefined( this.subData.to.cityId )
      && !isNullOrUndefined( this.subData.from.name ) && !isNullOrUndefined( this.subData.to.name )
      && this.subData.notificationType === "PUSH" )
    {
      this.isDataReady = true;
    }

    /** DEBUG **/
    if( isNullOrUndefined( this.subData ) ) { console.log("FALSE: subData=undefined/null=", this.subData); }
    if( isNullOrUndefined( this.subData.subscriber ) ) { console.log("FALSE: subscriber=undefined/null=", this.subData.subscriber); }
    if( isNullOrUndefined( this.subData.from.cityId ) ) { console.log("FALSE: from=undefined/null=", this.subData.from.cityId); }
    if( isNullOrUndefined( this.subData.from.name ) ) { console.log("FALSE: from=undefined/null=", this.subData.from.name); }
    if( isNullOrUndefined( this.subData.to.cityId ) ) { console.log("FALSE: from=undefined/null=", this.subData.to.cityId); }
    if( isNullOrUndefined( this.subData.to.name ) ) { console.log("FALSE: to=undefined/null=", this.subData.to.name); }
    if( this.subData.notificationType === "PUSH" ) { /*console.log("notificationType==\"PUSH\"=", this.subData.notificationType);*/ }
    else { console.log("FALSE: notificationType!=\"PUSH\"=", this.subData.notificationType); }
    console.log("isDataReady = ", this.isDataReady);
    console.log("subData = ", this.subData);
    /** koniec DEBUGu **/
  }

}
