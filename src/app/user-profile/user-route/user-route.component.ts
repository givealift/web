import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../_services/route.service';
import { UserService } from '../../_services/user.service';
import { Route } from '../../_models';
import { SpinnerProvider } from '../../_providers/spinner-provider';


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

  constructor(
    private routeService: RouteService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private spinnerProvider: SpinnerProvider) {

    /*   let id = +localStorage.getItem("id");
       this.spinnerProvider.open();
       this.userService.countUserRides(id)
         .subscribe(data=>this.routesAmount = data);
       this.userService.getUserRides(id, this.page).subscribe(
         data => {
           this.spinnerProvider.close();
           this.routes = data;
         },
         error => {
           this.spinnerProvider.close();
         }
       );*/
  }

  ngOnInit() {
    let id = +localStorage.getItem("id");
    setTimeout(() => this.spinnerProvider.open());
    this.userService.countUserRides(id)
      .subscribe(data => {
        this.routesAmount = data;
        if (data > 0) {
          this.hasUserRoutes = true;
        }
        else {
          this.hasUserRoutes = false;
        }
      });
    this.userService.getUserRides(id, this.page).subscribe(
      data => {
        this.routes = data;

        this.spinnerProvider.close();
      },
      error => {
        this.hasUserRoutes = false;
        this.spinnerProvider.close();
      }
    );
  }

  changePage(page: number) {
    console.log(page);
    this.userService.getUserRides(this.userId, page)
      .subscribe(routes => this.routes = routes);

  }

}
