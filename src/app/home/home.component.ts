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

    console.log(fromCity, toCity);

    this.showSpinner = true;
    this.rideService
      .search(fromCity, toCity, this.date.value)
      .subscribe(rides => {

        this.showSpinner = false;
      })


  }
}
