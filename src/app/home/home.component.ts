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
import { MessagingService } from '../_services/messaging.service';
import { Subject } from 'rxjs';
import {isNullOrUndefined} from "util";

enum Interchange { ENABLED, DISABLED };

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
  withInterchange = false;

  constructor(
    private authService: AuthService,
    private cityService: CityService,
    private routeService: RouteService,

    private router: Router,
    private dataTransferService: DataProviderService,
    private msgService: MessagingService) { }

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
    this.foundNothing = false;
    this.routeService
      .search(fromCity, toCity, this.date.value)
      .subscribe(routes => {
        if (routes.length === 0) {
          if (!this.withInterchange) {
            this.finishWithNoResults();
            return;
          }
          this.routeService.searchWithInterchange(fromCity, toCity, this.date.value).subscribe(routesWithChange => {
            if (routesWithChange.length === 0) {
              this.finishWithNoResults();
              return;
            }
            console.log(routesWithChange);
            this.redirectToResults(routesWithChange, Interchange.ENABLED);
            return;
          })
        } else {
          this.redirectToResults(routes, Interchange.DISABLED);
        }
      }, _ => {
        this.showSpinner = false;
      })
  }

  redirectToResults(routes, interchange: Interchange) {
    this.foundRoutes = routes;
    const dateString = moment(this.date.value).format('YYYY-MM-DD');
    const withInterchange = interchange === Interchange.ENABLED ? true : false;

    if (withInterchange) {
      routes = [].concat(...routes);
    }

    const from = routes[0].from.city.cityId;
    const to = withInterchange ? routes[1].to.city.cityId : routes[0].to.city.cityId;
    const tag = this.dataTransferService.tagResults(from, to, dateString);
    
    this.dataTransferService.storeData(`search/${tag}`, { routes: routes, withInterchange: withInterchange });
    this.router.navigate([`/search`], { queryParams: { from: from, to: to, date: dateString } });
    this.showSpinner = false;
  }

  finishWithNoResults() {
    this.foundNothing = true;
    this.showSpinner = false;
  }

  toggleInterchange() {
    this.withInterchange = !this.withInterchange;
  }
}
