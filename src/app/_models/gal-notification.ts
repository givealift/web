import { City } from ".";

export class GalNotification {
    routeId: number;
    newRoute: NewRouteNotification;
    reservation: ReservationNotification;
}

export class NewRouteNotification {
    from: City = new City();
    to: City = new City();
    date: Date;
}

export class ReservationNotification {
    userId: number;
}
