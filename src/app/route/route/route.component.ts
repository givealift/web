import { Component, OnInit, Input } from '@angular/core';
import { Route } from '../../_models';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent {

  @Input()
  routeData: Route = new Route();

  constructor() { }

  onClick() {

  }

}
