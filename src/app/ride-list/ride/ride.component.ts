import { Component, OnInit, Input } from '@angular/core';
import { Ride } from '../../services/ride.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  test: String = "ayyyy";

  @Input()
  rideData: Ride = new Ride();

  constructor() { }

  ngOnInit() {
  }

}
