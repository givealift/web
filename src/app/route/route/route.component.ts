import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { Route, User } from '../../_models';
import { Router } from "@angular/router";
import { UserService } from "../../_services/user.service";
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private userService: UserService, private router: Router, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.routeData.ownerId) {
      this.userId = this.routeData.ownerId;
      this.userService.getById(this.userId).subscribe(
        data => {
          this.userData = data;
        });
    } else {
      this.userData = this.routeData.galUserPublicResponse;
    }

    this.userService.getPhoto(this.userId)
      .subscribe(photo => {
        let urlCreator = window.URL;
        this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
      })
  }

  redirectToRouteDetails() {
    this.router.navigate(["/route/" + this.routeData.routeId]);
  }

  goToUserPage() {
    this.router.navigate(['user/' + this.userId]);
  }
}
