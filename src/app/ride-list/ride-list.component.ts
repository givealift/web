import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent {

  rides: any = [];

  constructor(private rideService: RideService) {
    Observable.interval(1000)
      .switchMap(() => this.rideService.getAll())
      .subscribe(
        (data) => {
          this.rides = data;
        });
  }

}
