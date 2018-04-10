import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit {

  private rides: any = [];
  pollingData: any;

  constructor(private httpClient: HttpClient) {
    this.pollingData = Observable.interval(1000)
      .switchMap(() => httpClient.get('/api/rides/list'))
      .subscribe(
        (data) => {
          this.rides = data;
          console.log('ayy');// see console you get output every 5 sec
        });
  }

  ngOnInit() {
  }

}
