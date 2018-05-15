import { Location } from "./location";
import { PublicUser } from "./user";

export class Route {
    galUserPublicResponse: PublicUser;
    routeId: number;
    ownerId: number;
    numberOfSeats: number;
    numberOfOccupiedSeats: number;
    price: number;

    from: Location = new Location();
    to: Location = new Location();
    stops: Array<Location>;
}