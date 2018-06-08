import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";
import { DataProviderService } from '../../_services/data-provider.service';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../_services/route.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  @Input() routes: any = [];

  constructor(
    private dataTransferService: DataProviderService,
    private route: ActivatedRoute,
    private routeService: RouteService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const from = params['from'];
      const to = params['to'];
      const date = params['date'];

      const taggedResults = this.dataTransferService.tagResults(from, to, date);

      let routes = this.dataTransferService.getData(`route-list/${taggedResults}`);

      if (!routes) {
        this.routeService
          .searchWithIds(+from, +to, date)
          .subscribe(routes => {
            this.routes = routes;
          })
      }

      this.routes = routes;
    });
  }
}
