import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CityService, City } from '../services/city-service';

export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}


@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {

  selectedCity = new FormControl();
  filteredCities$: Observable<City[]>;
  private searchTerms = new Subject<string>();

  constructor(private cityService: CityService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.filteredCities$ = this.searchTerms.pipe(
      debounceTime(0.3 * 1000),
      distinctUntilChanged(),
      switchMap((term: string) => this.cityService.searchCity(term))
    );
  }

  print(city: City) {
    console.log(city);
  }

}
