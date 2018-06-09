import {Component, Input, OnInit} from '@angular/core';
import { Route } from "../../_models";
import {isNull, isNullOrUndefined} from "util";

@Component({
  selector: 'app-route-list2',
  templateUrl: './route-list2.component.html',
  styleUrls: ['./route-list2.component.css']
})
export class RouteList2Component implements OnInit {

  constructor() { }

  @Input() routes: Array<Route>;
  isEmpty: boolean = false;

  ngOnInit() {
      this.isEmpty = false;
      this.validateIsEmpty();
  }



  validateIsEmpty() {
      if ( isNullOrUndefined( this.routes ) || this.routes.length===0 ) {
          this.isEmpty = true;
      }
      else {
          this.isEmpty = false;
      }
  }

}
