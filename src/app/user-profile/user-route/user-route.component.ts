import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../_services/route.service';
import { UserService } from '../../_services/user.service';
import { Route } from '../../_models';


@Component({
  selector: 'app-profile-route',
  templateUrl: './user-route.component.html',
  styleUrls: ['./user-route.component.css']
})
export class UserRouteComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem("id"));
  routes: Route[] = [];
  page: number = 1;
  routesAmount: number;

  hasUserRoutes: boolean = true;

  constructor(private routeService: RouteService, private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    let id = +localStorage.getItem("id");
    this.userService.getUserRides(id, this.page).subscribe(
      data => {
        this.routes = data;
        this.hasUserRoutes = true;
        this.routesAmount = this.routes.length;
      },
      error => {
        this.hasUserRoutes = false;
      }
    );
  }

  changePage(page: number) {
    console.log(page);
    this.userService.getUserRides(this.userId, page)
      .subscribe(routes => this.routes = routes);

  }

}
