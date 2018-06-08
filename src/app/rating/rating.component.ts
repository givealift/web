import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  rate: number;

  constructor(private dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) {
  }


  sendUserRate() {
    this.userService.rateUser(this.data.userData.userId, this.rate).subscribe(
      () => {
        console.log("success!");
      },
      error => {
        console.log(error);
      }
    )
  }

  rateUser(rate: number) {
    this.rate = rate;
    console.log("current rate is: " + rate);
  }

}
