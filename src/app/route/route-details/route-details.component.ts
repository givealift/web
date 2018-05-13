import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from "../../_services/route.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  @Input()
  routeDetails;

  private routeId;

  constructor(
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(res => {
      this.routeId = res.routeId;
      console.log('route-details: got routeId= ' + this.routeId);
    });
  }

  ngOnInit() {
    // this.routeId = 203; //206

    // this.routeService.getRouteDetailsById( this.routeId ).subscribe(
    this.routeService.getById(this.routeId).subscribe(
      routes => {
        this.routeDetails = routes;
        console.log('getById(' + this.routeId + ') worked: ', routes);
        // console.log('getRouteDetailsById(' + this.routeId + ') worked: ', routes);
      }
    );

    // this.isThisRouteDetails_var = true;
  }

}
