import { City } from "./city";

export interface IRouteSubscriptionRequest {
    notificationType: string;
    subscriber: number;
    fromCityId: number;
    toCityId: number;
    date: any;
}

export interface IRouteSubscription {
<<<<<<< HEAD
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
=======
    subscriptionId: number;
    notificationType: string;
    subscriber: string;
    email: string;
    from: City;
    to: City;
    date: string;
    routeId: string;
}
>>>>>>> 5d11b3ac44c451a1b893c8b18295868b1fe7295d
