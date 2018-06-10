import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from "../../_services/route.service";
import { UserService } from "../../_services/user.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../_models";
import { Route } from "../../_models";
import { Router } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  sanitizedPhoto;

  routeDetails: Route = new Route();

  userData: User;

  private routeId: number;

  isDataReady: boolean = false;

  isOwner: boolean = false;

  constructor(
    private routeService: RouteService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.activatedRoute.params.subscribe(res => {
      this.routeId = res.routeId;
    });
  }

  ngOnInit() {
    this.routeService.getById(this.routeId).subscribe(
      route => {
        this.routeDetails = route;
        this.userData = route.galUserPublicResponse;

        this.isOwner = (this.userData.userId == parseInt(localStorage.getItem('id')));

        this.userService.getPhoto(this.userData.userId)
          .subscribe(photo => {
            let urlCreator = window.URL;
            this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
          })
        this.isDataReady = true;
      },
      _ => this.router.navigate(['/'])
    );
  }

  reserve() {
    this.routeService.reserve(this.routeDetails.routeId, this.userData.userId).subscribe(
      () => {
        console.log("success!");
      },
      error => {
        console.log(error);
      }
    )
  }

  addToFavourites() {
    console.log("Add to favourites route.routeId = ", this.routeDetails.routeId);
    this.userService.addRouteToUsersFavourites( this.routeDetails.routeId ).subscribe(
      response => {
        console.log('addRouteToUsersFavourites - worked: ', response);
      },
      error => {
        console.log('addRouteToUsersFavourites - error: ', error);
      }
    );
  }
}
