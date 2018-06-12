import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  @Input() routes: any = [];


  constructor() { }

  ngOnInit() { }
}
