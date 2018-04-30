import { City } from "./city";

export class Route {
    routeId: number;
    ownerId: number;
    driver: any; // temp fix until views are not updated
    date: any; // ^
    from: {
        localizationId: number;
        city: City
        street: string;
        buildingNumber: number
    };
    to: {
        localizationId: number;
        city: City
        street: string;
        buildingNumber: number
    };
    departureTime: string; // YYYY-MM-DD hh:mm
    numberOfSeats: number;
    numberOfOccupiedSeats: number;
    price: number
}
