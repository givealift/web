import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '../../_services/route.service';
import { Route, Location } from '../../_models';
import * as moment from 'moment';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.css']
})
export class NewRouteComponent {

  // @ViewChild('form1') routeForm: NgForm;
  // @ViewChild('form2') routeDetailForm: NgForm;
  @ViewChild('form3') additionalLocationsForm: NgForm;

  today = new Date();

  timeModel: any = {};
  chipTimeModel: any = {};

  routeModel: Route = new Route();
  showSpinner = false;

  chipModel: any = {};
  cityChips = new Array<Location>();

  constructor(private router: Router,
    private routeService: RouteService,
    private authService: AuthService) {
  }

  onSubmit() {
    this.routeModel.from.date = this.buildDepartureTimeString(this.routeModel.from.date, this.timeModel.from)
    this.routeModel.to.date = this.buildDepartureTimeString(this.routeModel.to.date, this.timeModel.to);

    this.routeModel.stops = this.cityChips;
    this.showSpinner = true;
    const { token, id } = this.authService.getCredentials();
    this.routeModel.ownerId = +id;

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

  addChip() {
    let newLocation = this.buildLocationFromChipModel();

    this.cityChips.push(newLocation);
    this.chipModel = {};
    this.chipTimeModel = {};
    this.additionalLocationsForm.reset();
  }

  remove(chip: any) {
    let index = this.cityChips.indexOf(chip);

    if (index >= 0)
      this.cityChips.splice(index, 1);
  }

  buildDepartureTimeString(date: moment.Moment, time: string): string {
    return `${moment(date).format("YYYY-MM-DD")} ${time}`;
  }

  buildLocationFromChipModel() : Location {
    let newLocation = new Location();

    let chipDateTime = this.buildDepartureTimeString(this.chipTimeModel.date, this.chipTimeModel.time)
    newLocation.date = chipDateTime;
    newLocation.city.name = this.chipModel.name;
    newLocation.placeOfMeeting = this.chipModel.placeOfMeeting;

    return newLocation;
  }
}
