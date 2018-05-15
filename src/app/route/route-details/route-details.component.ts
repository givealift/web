import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from "../../_services/route.service";
import { UserService } from "../../_services/user.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../_models";
import { Route } from "../../_models";
import { Router } from "@angular/router";

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  routes: any = [];

  routeDetails: Route = new Route();

  userData: User;

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

        if (this.routeDetails.stops === undefined) {
          console.log('stops===undefined: ' + this.routeDetails.stops );
          this.routeDetails.stops = null;
        } else {
          console.log('stops: ' + this.routeDetails.stops );
          this.numberOfStops = this.routeDetails.stops.length;
        }

        if ( this.routeDetails.stops !== null ) {
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
