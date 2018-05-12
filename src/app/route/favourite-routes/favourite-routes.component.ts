import { Component, OnInit } from '@angular/core';
import  {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-favourite-routes',
  templateUrl: './favourite-routes.component.html',
  styleUrls: ['./favourite-routes.component.css']
})
export class FavouriteRoutesComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  public favouriteRoutes;
  public isThisFavouriteRoutes_var: boolean = false;

  ngOnInit() {
    this.userService.getUserFavourites(1).subscribe(
      routes => {
        console.log('getUserFavourites - worked: ', routes);
        this.favouriteRoutes = routes;
      }
    );

    this.isThisFavouriteRoutes_var = true;
  }

}
