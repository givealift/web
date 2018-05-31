import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  @Input()
  subData: any;
  isDataReady: boolean = false;

  constructor() { this.isDataReady = false; }

  ngOnInit() {

    //getFromCity, getToCity //byId
    //date
    //notificationType
    //subscriber //<- subscriberId

    /** Fake'owe dane
     * TO DO: zamienic i usunac
     *
     * **/

    if ( this.subData.fromCityId === 1 ) { this.subData.fromCityName = "Kraków"; }
    if ( this.subData.fromCityId === 2 ) { this.subData.fromCityName = "Warszawa"; }
    if ( this.subData.fromCityId === 3 ) { this.subData.fromCityName = "Łódź"; }
    if ( this.subData.fromCityId === 4 ) { this.subData.fromCityName = "Katowice"; }

    if ( this.subData.toCityId === 1 ) { this.subData.toCityName = "Kraków"; }
    if ( this.subData.toCityId === 2 ) { this.subData.toCityName = "Warszawa"; }
    if ( this.subData.toCityId === 3 ) { this.subData.toCityName = "Łódź"; }
    if ( this.subData.toCityId === 4 ) { this.subData.toCityName = "Katowice"; }

    if( this.subData!== null && this.subData.subscriber !== undefined ) this.subData.subscriber = "Nazwisko Imie";
    //Znalezc nazwe uzytkownika po Id?

    if ( this.subData!== null && this.subData !== []
      && this.subData.subscriber!== undefined
      && this.subData.fromCityId !== undefined && this.subData.toCityId !== undefined
      && this.subData.fromCityName !== undefined && this.subData.toCityName !== undefined )
    {
      this.isDataReady = true;
    }

    console.log("subData = ", this.subData);

  }

}
