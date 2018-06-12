import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../_services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DataProviderService } from '../_services/data-provider.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  rate: number;

  sanitizedPhoto;



  constructor(private dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.userService.getPhoto(this.data.userData.userId)
      .subscribe(photo => {
        let urlCreator = window.URL;
        this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
      })
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
