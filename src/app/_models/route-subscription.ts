import { City } from "./city";

export interface IRouteSubscriptionRequest {
    notificationType: string;
    subscriber: number;
    fromCityId: number;
    toCityId: number;
    date: string;
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