import { City } from "./city";

export interface IRouteSubscriptionRequest {
    notificationType: string;
    subscriber: number;
    fromCityId: number;
    toCityId: number;
    date: any;
}

export interface IRouteSubscription {
    subscriptionId: number;
    notificationType: string;
    subscriber: string;
    email: string;
    from: City;
    to: City;
    date: string;
    routeId: string;
}

export class RouteSubscription implements IRouteSubscription {
    subscriptionId: number;
    notificationType: string;
    subscriber: string;
    email: string;
    from: City;
    to: City;
    date: string;
    routeId: string;

    constructor() {
        this.subscriptionId = -1;
        this.notificationType = null;
        this.subscriber = null;
        this.email = null;
        this.from = new City();
        this.to = new City();
        this.date = null;
        this.routeId = null;
    }
}
