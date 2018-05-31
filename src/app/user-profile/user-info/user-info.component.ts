import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../_models';
import { UserService } from '../../_services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RatingProvider } from '../../_providers/rating-provider';

@Component({
  selector: 'app-profile-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  sanitizedPhoto;

  user: User = new User();

  userId: number;

  isDataReady: boolean = false;


  @ViewChild('form') form: NgForm;

  constructor(private route: ActivatedRoute,
    private router: Router, private userService: UserService,
    private sanitizer: DomSanitizer, private ratingProvider: RatingProvider) {
    this.route.params.subscribe(
      param => this.userId = param.id,
      error => this.router.navigate['home']
    );
    this.userService.getById(this.userId).subscribe(user => {
      if (user != null) {
        this.user = user;
        this.user.userId = this.userId;
        this.userService.getPhoto(this.userId)
          .subscribe(photo => {
            let urlCreator = window.URL;
            this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
          })
        this.isDataReady = true;
      }
      else {
        this.router.navigate['home'];
      }
    });
  }

  rateUser() {
    this.ratingProvider.open(this.sanitizedPhoto, this.user);
  }

}
