import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { DataTransferService } from '../../_services/data-transfer.service';
import {FavouriteRoutesComponent} from "../favourite-routes/favourite-routes.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  @Input() routes: any = [];

  constructor(
    private dataTransferService: DataTransferService,
    private router: Router
  ){}

  ngOnInit(){
    this.routes = this.dataTransferService.getData("route-list");
  }

  // constructor(private httpClient: HttpClient) {

    // Observable.interval(1000)
    //   .switchMap(() => httpClient.get('/api/route/list'))
    //   .subscribe(
    //     (data) => {
    //       this.routes = data;
    //     });

  isThisProfileFavouriteRoutes() {
    let response = false;

    if ( this.router.url === "/profile/favourite-routes" ) response = true;

    return response;
  }

  getClassName() {
    if ( this.isThisProfileFavouriteRoutes() ) {
      return "favouriteRoutesStyle";
    } else {
      return "routeList";
    }
  }

}
