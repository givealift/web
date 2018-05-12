import { Component, OnInit, Input } from '@angular/core';
import { Route } from '../../_models';
import { Router } from "@angular/router";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @Input()
  routeData: Route = new Route();

  //input dostaje od Component'u: Route-list, wnioskowany ze scierzyki ( router )
  @Input()
  isThisProfileFavouriteRoutes: boolean = false;

  @Input()
  isThisRouteDetails: boolean = false;

  constructor( private router: Router ) { }

  redirectDetails() {
    this.router.navigate(["/route/" + this.routeData.routeId]);
  }

  onClick() {

  }

}
