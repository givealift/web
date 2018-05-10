import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from '../../_services/route.service';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { Route } from '../../_models';


@Component({
  selector: 'app-profile-route',
  templateUrl: './user-route.component.html',
  styleUrls: ['./user-route.component.css']
})
export class UserRouteComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem("id"));
  routes: Route[];
  page: number = 0;

  constructor(private routeService: RouteService, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    let id = +localStorage.getItem("id");
    let page = 0;
    this.userService.getUserRides(id, page).subscribe(
      data => this.routes = data
    );
  }

  ngOnInit() {
    this.changePage(this.page);
  }

  changePage(page: number) {
    this.userService.getUserRides(this.userId, this.page)
      .subscribe(routes => this.routes = routes);

  }

}
