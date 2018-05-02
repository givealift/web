import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { RouteService } from '../../_services/route.service';
@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent {

  routes: any = [];

  constructor(private rideService: RouteService) {
    Observable.interval(1000)
      .switchMap(() => this.rideService.getAll())
      .subscribe(
        (data) => {
          this.routes = data;
        });
  }

}
