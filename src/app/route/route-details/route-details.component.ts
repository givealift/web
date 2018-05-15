import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from "../../_services/route.service";
import { UserService } from "../../_services/user.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../_models";
import { Route } from "../../_models";
import { Router } from "@angular/router";
import {City} from "../../_models/city";

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  @Input()
  routes: any = [];

  @Input()
  routeDetails: Route = new Route();

  @Input()
  userData: User;

  @Input()
  numberOfStops: number = 0;

  private routeId;


  constructor(
    private routeService: RouteService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(res => {
      this.routeId = res.routeId;
      console.log('route-details: got routeId= ' + this.routeId);
    });
  }

  ngOnInit() {
    // this.routeId = 203; //206
    console.log('route-details.ngOnInit(' + this.routeId + ') working... ');

    this.routeService.getById(this.routeId).subscribe(
      routes => {
        this.routes = routes;
        if ( this.routes.length === 1) {
          this.routeDetails = this.routes[0]; }
        // for ( let route of this.routes ) {
        //   this.routeDetails = route; }
        // this.routeDetails = this.routes.valueOf();

        let userId = this.routeDetails.ownerId;
        let possibleUser = this.userService.getById(userId);
        if (possibleUser != null) {
          this.userData = possibleUser; }

        if (this.routeDetails.from.date === undefined) {
          console.log('from date===undefined: ' + this.routeDetails.from.date );
          this.routeDetails.from.date = null;
        } else {
          console.log('from date: ' + this.routeDetails.from.date); }

        if (this.routeDetails.from.placeOfMeeting === undefined) {
          console.log('from placeOfMeeting===undefined: ' + this.routeDetails.from.placeOfMeeting );
          this.routeDetails.from.placeOfMeeting = null;
        } else {
          console.log('from placeOfMeeting: ' + this.routeDetails.from.placeOfMeeting ); }

        if (this.routeDetails.to.placeOfMeeting === undefined) {
          console.log('to placeOfMeeting===undefined: ' + this.routeDetails.to.placeOfMeeting );
          this.routeDetails.to.placeOfMeeting = null;
        } else {
          console.log('to placeOfMeeting: ' + this.routeDetails.to.placeOfMeeting ); }


          // buildingNumber: number;
          // city: City = new City();
          // date: any;
          // localizationId: number;
          // placeOfMeeting: string;
          this.routeDetails.stops = [
            {
              "buildingNumber": 11,
              "city": {
                "cityId": "20",
                "name": "Częstochowa",
                "country": "powiat Katowice",
                "province": "śląskie",
                "cityInfo": {
                  "cityInfoId": 20,
                  "population": 304362,
                  "citySize": 165
                }
              },
              "date": "2018-05-13T23:42:49+0000",
              "localizationId": 201,
              "placeOfMeeting": "Krzywa 4"
            },
            {
              "buildingNumber": 16,
              "city": {
                "cityId": "23",
                "name": "Radomkso",
                "country": "powiat Warszawa",
                "province": "mazowieckie",
                "cityInfo": {
                  "cityInfoId": 2,
                  "population": 1724404,
                  "citySize": 517
                }
              },
              "date": "2018-05-14T03:50:00+0000",
              "localizationId": 217,
              "placeOfMeeting": "Wyszyńskiego 7"
            },
            {
              "buildingNumber": 16,
              "city": {
                "cityId": "23",
                "name": "Kamieńsk",
                "country": "powiat Warszawa",
                "province": "mazowieckie",
                "cityInfo": {
                  "cityInfoId": 2,
                  "population": 1724404,
                  "citySize": 517
                }
              },
              "date": "2018-05-14T03:50:00+0000",
              "localizationId": 217,
              "placeOfMeeting": "Szkolna 17"
            },
            {
              "buildingNumber": 16,
              "city": {
                "cityId": "24",
                "name": "Pabianice",
                "country": "powiat Warszawa",
                "province": "mazowieckie",
                "cityInfo": {
                  "cityInfoId": 2,
                  "population": 1724404,
                  "citySize": 517
                }
              },
              "date": "2018-05-14T03:50:00+0000",
              "localizationId": 218,
              "placeOfMeeting": "Orla 19"
            },
            {
              "buildingNumber": 16,
              "city": {
                "cityId": "21",
                "name": "Piotrków Trybunalski",
                "country": "powiat Warszawa",
                "province": "mazowieckie",
                "cityInfo": {
                  "cityInfoId": 2,
                  "population": 1724404,
                  "citySize": 517
                }
              },
              "date": "2018-05-14T03:50:00+0000",
              "localizationId": 219,
              "placeOfMeeting": "Skrzywiona 4"
            },
            {
              "buildingNumber": 16,
              "city": {
                "cityId": "22",
                "name": "Łódź",
                "country": "powiat Warszawa",
                "province": "mazowieckie",
                "cityInfo": {
                  "cityInfoId": 2,
                  "population": 1724404,
                  "citySize": 518
                }
              },
              "date": "2018-05-14T03:50:00+0000",
              "localizationId": 221,
              "placeOfMeeting": "Płynna 14"
            },
          ];

        if (this.routeDetails.stops === undefined) {
          console.log('stops===undefined: ' + this.routeDetails.stops );
          this.routeDetails.stops = null;
        } else {
          console.log('stops: ' + this.routeDetails.stops );
          this.numberOfStops = this.routeDetails.stops.length;
        }

        if( this.routeDetails.stops !== null ) {
          for ( let stop of this.routeDetails.stops ) {
            if ( stop === undefined ) {
              stop = null;
            }
          }
        }

        console.log('route-details.ngOnInit(' + this.routeId + ', ' + this.routeDetails + ') worked: ', routes);
      }
    );

  }

  redirectToRouteDetails() {
    this.router.navigate(["/route/" + this.routeDetails.routeId]);
  }

}
