import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent {

  rides: any = [];

  constructor(private httpClient: HttpClient) {
    Observable.interval(1000)
      .switchMap(() => httpClient.get('/api/rides/list'))
      .subscribe(
        (data) => {
          this.rides = data;
        });
  }

}
