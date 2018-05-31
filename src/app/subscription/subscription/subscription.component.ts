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

  constructor() { }

  ngOnInit() {
    //getFromCity, getToCity //byId
    //date
    //notificationType
    //subscriber //<- subscriberId

    /** Fake'owe dane
     * TO DO: zamienic i usunac
     *
     * **/

    if( this.subData.fromCityId == 1 ) { this.subData.setParameter("fromCityName", "Kraków"); }
    if( this.subData.fromCityId == 2 ) { this.subData.setParameter("fromCityName", "Warszawa"); }
    if( this.subData.fromCityId == 3 ) { this.subData.setParameter("fromCityName", "Łódź"); }
    if( this.subData.fromCityId == 4 ) { this.subData.setParameter("fromCityName", "Katowice"); }

    if( this.subData.toCityId == 1 ) { this.subData.setParameter("toCityName", "Kraków"); }
    if( this.subData.toCityId == 2 ) { this.subData.setParameter("toCityName", "Warszawa"); }
    if( this.subData.toCityId == 3 ) { this.subData.setParameter("toCityName", "Łódź"); }
    if( this.subData.toCityId == 4 ) { this.subData.setParameter("toCityName", "Katowice"); }

    this.subData.setParameter("subscriber", "Nazwisko Imie"); //Znalezc nazwe uzytkownika po Id?

    this.isDataReady = true;
    console.log("subData = ", this.subData);

  }

}
