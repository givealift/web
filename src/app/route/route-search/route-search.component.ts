import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../_services/data-provider.service';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../_services/route.service';

@Component({
  selector: 'app-route-search',
  templateUrl: './route-search.component.html',
  styleUrls: ['./route-search.component.css']
})
export class RouteSearchComponent implements OnInit {

  routes = [];
  withInterchange: boolean = false;
  nothingFound = false;

  constructor(
    private dataTransferService: DataProviderService,
    private route: ActivatedRoute,
    private routeService: RouteService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const from = params['from'];
      const to = params['to'];
      const date = params['date'];

      const tag = this.dataTransferService.tagResults(from, to, date);

      let data = this.dataTransferService.getData(`search/${tag}`);

      let routes, withInterchange;
      if (data !== null) {
        ({ routes, withInterchange } = data);
      } 

      this.withInterchange = withInterchange;

      if (!routes) {
        this.routeService
          .searchByIds(+from, +to, date)
          .subscribe(routes => {
            if (routes.length === 0) {
              this.routeService
                .searchByIdsWithInterchange(+from, +to, date)
                .subscribe(routesWithChange => {
                  if (routesWithChange.length === 0) {
                    this.nothingFound = true;
                  } else {
                    this.withInterchange = true;
                    this.routes = [].concat(...routesWithChange);
                  }
                })
            }

            this.routes = routes;
          })
      }

      this.routes = routes;
    });
  }

}
