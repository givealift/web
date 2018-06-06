import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { IRouteSubscriptionRequest, IRouteSubscription } from '../_models/route-subscription';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { CityService } from './city.service';
import { combineLatest } from "rxjs/observable/combineLatest";
import { of } from "rxjs/observable/of";
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';

@Injectable()
export class SubscriptionService {

  private readonly url = `${environment.apiUrl}/subscription`;


  constructor(
    private httpClient: HttpClient
    , private authService: AuthService
    , private cityService: CityService
    , private router: Router) { }

  subscribeForNotification(from: string, to: string, date: moment.Moment) {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate([`/login`]);
      return;
    }

    const [fromStream, toStream] = [from, to].map(city => this.cityService.searchCity(city));

    return combineLatest(fromStream, toStream)
      .flatMap(([fromCity, toCity]) => {
        if (fromCity && toCity) {
          const body: IRouteSubscriptionRequest = {
            notificationType: "PUSH",
            subscriber: +this.authService.getCurrentUserId(),
            fromCityId: fromCity.cityId,
            toCityId: toCity.cityId,
            date: date ? date.format("YYYY-MM-DD") : null
          }
          return this.httpClient.post(this.url, body);
        }
        return of(null);
      });
  }

  getAll = () => this.httpClient
    .get<IRouteSubscription[]>(`${this.url}/all`)
    .map(data => data.filter(s => moment(s.date).isSameOrAfter() || s.date === null));

  getUserSubscriptions(userId: string = this.authService.getCurrentUserId()) {
    return this.getAll()
      .map(data => data.filter(s => s.subscriber === userId));
  }
}
