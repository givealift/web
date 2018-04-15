import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { CityService } from '../services/city.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  cities$: Observable<string[]>;
  private searchTerms = new Subject<string>();

  constructor(private cityService: CityService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.cities$ = this.searchTerms.pipe(
      debounceTime(0.3 * 1000),
      distinctUntilChanged(),
      switchMap((term: string) => this.cityService.searchCity(term))
    );
  }

}
