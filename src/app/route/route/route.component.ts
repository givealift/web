import { Component, OnInit, Input } from '@angular/core';
import { Route, User } from '../../_models';
import { Router } from "@angular/router";
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @Input()
  routeData: Route = new Route();

  userData: User;

  @Input() //input dostaje od Component'u: Route-list, wnioskowany ze scierzyki ( router )
  isThisProfileFavouriteRoutes: boolean = false;

  @Input() //input dostaje od Component'u: Route-list, wnioskowany ze scierzyki ( router )
  isThisRouteDetails: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    let userId = this.routeData.ownerId;
    this.userService.getById(userId)
      .subscribe(user => {
        this.userData = user;
      });
  }

  redirectToRouteDetails() {
    this.router.navigate(["/route/" + this.routeData.routeId]);
  }

  onClick() {

  }

}
