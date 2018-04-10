import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-new-ride',
  templateUrl: './new-ride.component.html',
  styleUrls: ['./new-ride.component.css']
})
export class NewRideComponent {

  @ViewChild('form') rideForm: NgForm;

  rideModel: any = {};

  constructor(private router: Router,
    private rideService: RideService) { }

  onSubmit() {
    this.rideModel.driver = JSON.parse(localStorage.getItem('currentUser'));
    this.rideService.create(this.rideModel).subscribe(
      () => {
        this.router.navigate(['/ride-list']);
      },
      error => {
        this.router.navigate(['/home']);
      }
    )
  }


}
