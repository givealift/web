import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import * as moment from "moment";
import { City, CityService } from '../services/city-service';
import { RideService } from '../services/ride.service';
import { Observable } from 'rxjs/Observable';
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

  minDate = new Date();
  date = new FormControl(moment(), [Validators.required]);

  fromCity: City;
  toCity: City;

  showSpinner = false;
  constructor(
    private authService: AuthService,
    private cityService: CityService,
    private rideService: RideService) { }

  ngOnInit() {
    this.authService.loggedInStatus.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  search(fromCity: City, toCity: City) {
    //TODO: move logic to rideService, add date
    this.showSpinner = true;

    const lookForCity = (city: City): Observable<City[]> => this.cityService.searchCity(city.toString(), 1);

    let cityFromObject = fromCity.hasOwnProperty("cityId") ? Observable.of([fromCity]) : lookForCity(fromCity);
    let cityToObject = toCity.hasOwnProperty("cityId") ? Observable.of([toCity]) : lookForCity(toCity);

    Observable.forkJoin([cityFromObject, cityToObject]).subscribe(([foundFromCities, foundToCities]) => {
      console.log("fetched from city:");
      console.log(foundFromCities[0]);
      console.log("fetched to city:");
      console.log(foundToCities[0]);
      this.showSpinner = false;
    })
  }
}
