export class City {
    cityId: string;
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
