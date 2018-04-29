import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent {

  routes: any = [];

  constructor(private httpClient: HttpClient) {
    Observable.interval(1000)
      .switchMap(() => httpClient.get('/api/routes/list'))
      .subscribe(
        (data) => {
          this.routes = data;
        });
  }

}
