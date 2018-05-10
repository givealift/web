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

  userData: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    let userId = this.routeData.ownerId;
    this.userService.getById(userId)
      .subscribe(user => {
        this.userData = user;
      });
  }

  onClick() {

  }

}
