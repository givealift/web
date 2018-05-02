import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from '../../_services/route.service';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { Route } from '../../_models';


@Component({
  selector: 'app-profile-ride',
  templateUrl: './user-ride.component.html',
  styleUrls: ['./user_ride.component.css']
})
export class UserRideComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem("id"));
  routes: Route[];
  page: number = 0;

  constructor(
    private routeService: RouteService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.changePage(this.page);
  }

  changePage(page: number) {
    this.userService.getUserRides(this.userId, this.page)
      .subscribe(routes => this.routes = routes);

  }

}
