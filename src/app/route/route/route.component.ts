import { Component, OnInit, Input } from '@angular/core';
import { Route, User } from '../../_models';
import { UserService } from '../../_services/user.service';

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

  constructor() { }

  onClick() {

  }

  getClassName() {
    if ( this.isThisProfileFavouriteRoutes === true ) {
      return "favouriteRouteStyle";
    } else {
      return ""; //route
    }
  }

}
