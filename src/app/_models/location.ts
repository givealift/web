import { City } from ".";

export class Location {
    buildingNumber: number;
    city: City = new City();
    date: any;
    localizationId: number;
    placeOfMeeting: string;
}