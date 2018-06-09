import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-favourite-routes',
  templateUrl: './favourite-routes.component.html',
  styleUrls: ['./favourite-routes.component.css']
})
export class FavouriteRoutesComponent implements OnInit {

  userId: number;

  constructor(
    private userService: UserService
  ) { }

  public favouriteRoutes;

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem("id"));

    this.userService.getUserFavourites(this.userId).subscribe(
      routes => {
        console.log('getUserFavourites - worked: ', routes);
        this.favouriteRoutes = routes;
      },
      error => {
        console.log('getUserFavourites- error: ', error);
      }
    );

  }

}
