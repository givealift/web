export class City {
    cityId: number;
    name: string;
    country: string;
    province: string;
    cityInfo: {
        cityInfoId: number,
        population: number,
        citySize: number
    }

    toString() {
        return this.name || "";
    }
}
