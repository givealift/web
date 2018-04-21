import { Component, OnInit, Input } from '@angular/core';
import {Ride} from "../../model/ride";
import {User} from "../../services/user.service";


@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent {

  @Input()
  rideData: Ride;
  driver:User;

  constructor() { }

  onClick() {

  }

}
