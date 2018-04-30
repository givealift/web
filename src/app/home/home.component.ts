import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import * as moment from "moment";
import { CityService } from '../_services/city.service';
import { RouteService } from '../_services/route.service';
import { Observable } from 'rxjs/Observable';
import { City, Route } from '../_models';


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
  constructor(
    private authService: AuthService,
    private cityService: CityService,
    private routeService: RouteService) { }

  ngOnInit() {
    this.authService.loggedInStatus.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  onEnter() {
    let button: HTMLElement = document.getElementsByClassName("btn-search")[0] as HTMLElement
    button.click();    
  }

  search(fromCity: City, toCity: City) {
    this.showSpinner = true;
    this.foundRoutes = null;
    this.routeService
      .search(fromCity, toCity, this.date.value)
      .subscribe(routes => {
        this.foundRoutes = routes;
        console.log(routes); // temporary action with fetched routes
        this.showSpinner = false;
      }, err => {
        this.showSpinner = false;
      })
  }
}
