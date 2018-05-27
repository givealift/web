import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { IRouteSubscription } from '../_models/route-subscription';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class SubscriptionService {

  private readonly url = `${environment.apiUrl}/subscription` // TODO: poczekać na URL od Daniela 

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  subscribe(from: number, to: number, date: moment.Moment) {
    date = date !== null ? date : moment();
    const body: IRouteSubscription = {
      subscriptionType: "PUSH",
      subscriber: +this.authService.getCurrentUserId(),
      fromCityId: from,
      toCityId: to,
      date: date.format("YYYY-MM-DD")
    }

    return this.httpClient.post(this.url, body);
  }
}
