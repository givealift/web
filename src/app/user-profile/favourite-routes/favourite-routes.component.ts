import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import {isNullOrUndefined} from "util";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import { RouteService } from "../../_services/route.service";

@Component({
  selector: 'app-favourite-routes',
  templateUrl: './favourite-routes.component.html',
  styleUrls: ['./favourite-routes.component.css']
})
export class FavouriteRoutesComponent implements OnInit {

  userId: number;

  constructor(
    private userService: UserService,
    private routeService: RouteService
  ) { }

  public favouriteRoutes;

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem("id"));

    this.userService.getUserFavourites(this.userId).subscribe(
      routes => {
        console.log('getUserFavourites - worked: ', routes);
        this.favouriteRoutes = routes;
        this.favouriteRoutes = this.getFromBackEnd();
      },
      error => {
        console.log('getUserFavourites- error: ', error);
      }
    );
  }

  public getFromBackEnd() {
    /** **/
    let userFavouriteIds = this.getFavRoutesFromLocalStorage();
    let tmpUserFavouriteIds = userFavouriteIds;
    let favRoutes = this.favouriteRoutes;
    for ( let i = 0; i < tmpUserFavouriteIds.length; i++ ) {
      for ( let j = 0; j < favRoutes.length; j++ ) {
        if (  tmpUserFavouriteIds[i] === favRoutes[j].routeId ) {
          console.log( tmpUserFavouriteIds[i] + " == "+ favRoutes[j].routeId )
          if ( tmpUserFavouriteIds.length === 1) {
            tmpUserFavouriteIds = [];
          } else {
            tmpUserFavouriteIds.splice( i, 1 );
          }
          i = 0;
          j = 0;
        }
        else {
          console.log( tmpUserFavouriteIds[i] + " != "+ favRoutes[j].routeId );
        }
      }
    }
    console.log('fakebackend.getUserFavourites: back tmpUserFavouriteIds = ', tmpUserFavouriteIds);

    if( tmpUserFavouriteIds.length===0 ) {
      console.log('There are no fav routes out of those mocked (fake back end).');
      console.log('fakebackend.getUserFavourites: fake + back favRoutes = ', favRoutes);
      console.log('RETURN just fake backend.');
      return Observable.of(new HttpResponse({ status: 200, body: favRoutes }));
    }
    else {
      console.log("Looking for routes on backend.");
      let tmpRoute;
      for ( let routeId of tmpUserFavouriteIds ) {
        this.routeService.getById( routeId )
          .subscribe(
            response => {
              tmpRoute = response;
              console.log("tmpRoute: ", tmpRoute);
              console.log("response: ", response);

              if ( !isNullOrUndefined( tmpRoute ) ) {
                favRoutes.push( tmpRoute );
                console.log("now i'm pushing tmpRoute: ", tmpRoute);
                console.log('fakebackend.getUserFavourites: fake + back favRoutes = ', favRoutes);
                console.log('RETURN fake backend + legit backend.');
                this.favouriteRoutes = favRoutes;
                return this.favouriteRoutes
              }
            },
            error => {
              console.log("error: ", error);
            }
          );
      }
    }
    /** **/
  }

  public getFavRoutesFromLocalStorage() {
    let userFavouriteIds: Array<number> = [];
    // if ( true ) {
      if ( isNullOrUndefined( JSON.parse(localStorage.getItem('lsFavouriteRoutes')) ) ) {
        userFavouriteIds = [];// this.sampleFavRoutes;
        localStorage.setItem('lsFavouriteRoutes', JSON.stringify(userFavouriteIds));
      }
      else {
        if ( JSON.parse(localStorage.getItem('lsFavouriteRoutes')).length === 0  ) {
          userFavouriteIds = []; // this.sampleFavRoutes;
          localStorage.setItem('lsFavouriteRoutes', JSON.stringify(userFavouriteIds));
        }
        else {
          userFavouriteIds = JSON.parse(localStorage.getItem('lsFavouriteRoutes'));
        }
      }
    // }
    // else {
    //   userFavouriteIds = []; // this.sampleFavRoutes;
    // }
    console.log("userFavouriteIds = ", userFavouriteIds); /** **/
    return userFavouriteIds;
  }
}
