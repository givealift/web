import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '../../_services/route.service';
import { Route } from '../../_models';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.css']
})
export class NewRouteComponent {

  // @ViewChild('form1') routeForm: NgForm;
  // @ViewChild('form2') routeDetailForm: NgForm;

  isLinear = true;

  routeModel: Route = new Route();
  showSpinner = false;

  constructor(private router: Router,
    private routeService: RouteService) { }

  onSubmit() {
    this.showSpinner = true;
    this.routeModel.driver = JSON.parse(localStorage.getItem('currentUser'));
    this.routeService.create(this.routeModel).subscribe(
      () => {
        this.router.navigate(['/route-list']);
      },
      error => {
        this.showSpinner = false;
        this.router.navigate(['/home']);
      }
    )
  }


}
