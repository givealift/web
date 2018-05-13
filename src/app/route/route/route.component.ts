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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    let userId = this.routeData.ownerId;
    let possibleUser = this.userService.getById(userId);
    if (possibleUser != null)
      this.userData = possibleUser;
  }

  redirectToRouteDetails() {
    this.router.navigate(["/route/" + this.routeData.routeId]);
  }

  onClick() {

  }

}
