import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { Route, User } from '../../_models';
import { Router } from "@angular/router";
import { UserService } from "../../_services/user.service";
import { DomSanitizer } from '@angular/platform-browser';
import { RouteService } from '../../_services/route.service';
import { AuthService } from '../../_services/auth.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  sanitizedPhoto;

  @Input()
  routeData: Route = new Route();

  userData: User;
  userId: number; //for convenience
  currentUser: number;

  constructor(private userService: UserService, private router: Router, private sanitizer: DomSanitizer, private routeService: RouteService, private authService: AuthService) {
    this.currentUser = +this.authService.getCurrentUserId();
  }

  ngOnInit() {
    if (this.routeData.ownerId) {
      this.userId = this.routeData.ownerId;
      this.userService.getById(this.userId).subscribe(
        data => {
          this.userData = data;
          this.getPhoto();
        });
    } else if (this.routeData.galUserPublicResponse) {
      this.userData = this.routeData.galUserPublicResponse;
      this.userId = this.userData.userId;
      console.log(this.userData);
      this.getPhoto();
    }
    else {
      this.router.navigate(['']);
    }
  }

  redirectToRouteDetails() {
    this.router.navigate(["/route/" + this.routeData.routeId]);
  }

  goToUserPage() {
    this.router.navigate(['user/' + this.userId]);
  }

  getPhoto() {
    this.userService.getPhoto(this.userId)
      .subscribe(photo => {
        let urlCreator = window.URL;
        this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
      })
  }

  reserve() {
    this.routeService.reserve(this.routeData.routeId, this.currentUser).subscribe(
      () => {
        this.redirectToRouteDetails();
      },
      error => {
        console.log(error);
      }
    )
  }

  canReserve() {
    return this.routeData.numberOfSeats - this.routeData.numberOfOccupiedSeats > 0
      && ( !isNullOrUndefined(this.routeData.passengers) && !this.routeData.passengers.includes(this.currentUser) );
  }

  addToFavourites() {
      console.log("Add to favourites route.routeId = ", this.routeData.routeId);
      this.userService.addRouteToUsersFavourites( this.routeData.routeId );
  }
}
