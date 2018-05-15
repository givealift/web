import { Component, OnInit, Input } from '@angular/core';
import { Route, User } from '../../_models';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @Input()
  routeData: Route = new Route();

  userData: User;
  userId: number; //for convenience

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    if (this.routeData.ownerId) {
      this.userId = this.routeData.ownerId;
      let possibleUser = this.userService.getById(this.userId);
      if (possibleUser !== null) {
        this.userData = possibleUser;
      }
    } else {
      this.userData = this.routeData.galUserPublicResponse;
    }
  }

  goToUserPage() {
    this.router.navigate(['user/' + this.userId]);
  }
}
