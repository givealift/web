   export interface City {
        cityId: number;
    }

    export interface Localization {
        city: City;
        street: string;
        buildingNumber: number;
    }

    export interface Ride {
        ownerId: number;
        from: Localization;
        to: Localization;
        departureTime: string;
        numberOfSeats: number;
        numberOfOccupiedSeats: number;
        price: number;
    }


