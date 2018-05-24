import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import * as moment from "moment";
import { CityService } from '../_services/city.service';
import { RouteService } from '../_services/route.service';
import { Observable } from 'rxjs/Observable';
import { City, Route } from '../_models';
import { Router } from '@angular/router';
import { DataProviderService } from '../_services/data-provider.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly title = 'Give-a-lift';
  readonly startCityPlaceholder = "Wyruszam z...";
  readonly endCityPlaceholder = "Jadę do...";

  loggedIn: boolean = this.authService.isAuthenticated();

  today = new Date();
  date = new FormControl(moment(), [Validators.required]);

  foundRoutes: Route[];

  showSpinner = false;
  foundNothing = false;

  constructor(
    private authService: AuthService,
    private cityService: CityService,
    private routeService: RouteService,
    private router: Router,
    private dataTransferService: DataProviderService) { }

  ngOnInit() {
    this.authService.loggedInStatus.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  onEnter() {
    let button: HTMLElement = document.getElementsByClassName("btn-search")[0] as HTMLElement
    button.click();
  }

  search(fromCity: string, toCity: string) {
    this.showSpinner = true;
    this.foundRoutes = null;
    this.routeService
      .search(fromCity, toCity, this.date.value)
      .subscribe(routes => {

        if (routes.length === 0) {
          this.foundNothing = true;
          this.showSpinner = false;
          return;
        } else {
          this.foundRoutes = routes;
          const dateString = moment(this.date.value).format('YYYY-MM-DD');
          const resultsTag = this.dataTransferService.taggedResults(routes[0].from.date.cityId, routes[0].to.date.cityId, dateString);

          this.dataTransferService.storeData(`route-list/${resultsTag}`, routes);
          this.router.navigate([`/route-list`], { queryParams: { from: routes[0].from.city.cityId, to: routes[0].to.city.cityId, date: dateString } });
          this.showSpinner = false;
        }
      }, err => {
        this.showSpinner = false;
      })
  }
}
