import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";
import { DataProviderService } from '../../_services/data-provider.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  @Input() routes: any = [];

  constructor(private dataTransferService: DataProviderService,
    private router: Router) { }

  ngOnInit() {
    this.routes = this.dataTransferService.getData("route-list");
  }

  // constructor(private httpClient: HttpClient) {

  // Observable.interval(1000)
  //   .switchMap(() => httpClient.get('/api/route/list'))
  //   .subscribe(
  //     (data) => {
  //       this.routes = data;
  //     });

}
