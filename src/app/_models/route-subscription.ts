import { City } from "./city";

export interface IRouteSubscriptionRequest {
    notificationType: string;
    subscriber: number;
    fromCityId: number;
    toCityId: number;
    date: any;
}

export interface IRouteSubscription {
  notificationType: string;
  subscriber: string;
  email: string;
  from: City;
  to: City;
  date: any;
  routeId: string;
}
export class RouteSubscription implements IRouteSubscription {
  notificationType: string;
  subscriber: string;
  email: string;
  from: City;
  to: City;
  date: any;
  routeId: string;

  constructor() {
      this.notificationType = null;
      this.subscriber = null;
      this.email = null;
      this.from = new City();
      this.to = new City();
      this.date = null;
      this.routeId = null;
  }
}
