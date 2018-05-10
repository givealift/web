import { Location } from "./location";
export class Route {
    driver: any; // temp fix until views are not updated

    routeId: number;
    ownerId: number;
    numberOfSeats: number;
    numberOfOccupiedSeats: number;
    price: number;

    from: Location = new Location();
    to: Location = new Location();
    stops: Array<Location>;
}