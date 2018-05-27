import { Component, OnInit } from '@angular/core';
import {User} from "../../_models";

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {

  user: User = new User();
  userSubs: any = [];

  constructor() { }

  ngOnInit() {

    // this.subscriptionService.getByUserId(this.routeId).subscribe(
    //   route => {
    //     this.routeDetails = route;
    //     this.userData = route.galUserPublicResponse;
    //     this.userService.getPhoto(this.userData.userId)
    //       .subscribe(photo => {
    //         let urlCreator = window.URL;
    //         this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
    //       })
    //     this.isDataReady = true;
    //   },
    //   error => {
    //     this.router.navigate['user-routes'];
    //   }
    // );


    this.userSubs = [
      {'subName':'subcription#1', 'from':'Krakow', 'to':'Krakowek'},
      {'subName':'subcription#2', 'from':'Warszawa', 'to':'Warszawka'}
    ];
  }

}
