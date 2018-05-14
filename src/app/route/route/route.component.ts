import { Component, OnInit, Input } from '@angular/core';
import { Route, User } from '../../_models';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @Input()
  routeData: Route = new Route();

  userData: User;
  userId: number; //for convenience

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    let userId = this.routeData.ownerId;
    this.userService.getById(userId).subscribe(user => {
      if (user)
        this.userData = user;
    });
  }

  goToUserPage() {
    this.router.navigate(['user/' + this.userId]);
  }

}
