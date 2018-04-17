import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CitySearchComponent } from '../city-search/city-search.component';
import { RideListComponent } from '../ride-list/ride-list.component';
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild('from') cityFrom: CitySearchComponent;
  @ViewChild('to') cityTo: CitySearchComponent;
  @ViewChild(RideListComponent) rideList: RideListComponent;
  wasButtonClicked = false;

  title = 'Give-a-lift';
  loggedIn: boolean = this.authService.isAuthenticated();
  constructor(private authService: AuthService, private rideService: RideService) { }

  ngOnInit() {
    this.authService.loggedInStatus.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  ngAfterViewInit() {

  }

  search() {
    console.log(this.cityFrom.city, this.cityTo.city);
    this.rideService.find(this.cityFrom.city, this.cityTo.city).subscribe(rides => {
      this.rideList.rides = rides;
      this.wasButtonClicked = true;
    })
    

  }

}
