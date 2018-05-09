import { City } from "./city";

export class Route {
    driver: any; // temp fix until views are not updated

    routeId: number;
    ownerId: number;
    numberOfSeats: number;
    numberOfOccupiedSeats: number;
    price: number;

    from: Location = new Location();
    to: Location = new Location();
    stops: any;
}

export class Location {
    buildingNumber: number;
    city: City;
    date: any;
    localizationId: number;
    street: string;
}