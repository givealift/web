import { Component, ViewChild, OnInit } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import {Ride, RideService} from "../../services/ride.service";

@Component({
  selector: 'app-profile-ride',
  templateUrl: './user-ride.component.html',
  styleUrls: ['./user_info.component.css']
})
export class UserRideComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem("id"));
  rides:Ride[];
  page:number=0;


  constructor(
    private rideService:RideService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.changePage(this.page);
  }

  changePage(page:number){
    this.userService.getUserRides(this.userId,this.page)
  .subscribe(rides=>this.rides = rides );

  }

}
