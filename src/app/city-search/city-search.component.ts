import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CityService } from '../_services/city.service';
import { City } from '../_models';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {

  @Input()
  placeholder: string;

  @Output() enterPressed = new EventEmitter();

  selectedCity: string;
  filteredCities$: Observable<City[]>;
  private searchTerms = new Subject<string>();

  constructor(private cityService: CityService) { }

  onEnter() {
    this.enterPressed.emit();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.filteredCities$ = this.searchTerms.pipe(
      debounceTime(0.3 * 1000),
      distinctUntilChanged(),
      switchMap((term: string) => this.cityService.searchCities(term))
    );
  }
}
