import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '../../_services/route.service';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.css']
})
export class NewRouteComponent {

  @ViewChild('form') routeForm: NgForm;

  routeModel: any = {};
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
