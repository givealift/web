import { CityService } from "./city.service";
import { TestBed, async } from "@angular/core/testing";
import { CitiesProvider } from "../_providers/cities-provider";
import { HttpClientModule, HttpClient } from "@angular/common/http";

let cityService: CityService;

describe("CityService", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                CityService, CitiesProvider],
            imports: [HttpClientModule]
        })
    }))

    beforeEach(() => {
        cityService = TestBed.get(CityService);
    })

    it("#searchCity should return one city if exists", () => {
        const cityName = "Warszawa";
        cityService.searchCity(cityName).subscribe(city => {
            expect(city).toBeDefined();
            expect(city.name).toEqual(cityName);
        })
    })

    it("#searchCity should return null if city doesn't exists", () => {
        const cityName = "ZXC";
        cityService.searchCity(cityName).subscribe(city => {
            expect(city).toBe(null);
        })
    })

    it("#searchCities should return array with one item if found", () => {
        const cityName = "Warszawa";
        cityService.searchCities(cityName, 1).subscribe(cities => {
            expect(cities).toEqual(jasmine.any(Array));
            expect(cities.length).toEqual(1);
            expect(cities[0].name).toEqual(cityName);
        })
    })

    it("#searchCities should return empty array if not found", () => {
        const cityName = "ZXC";
        cityService.searchCities(cityName, 1).subscribe(cities => {
            expect(cities).toEqual(jasmine.any(Array));
            expect(cities.length).toEqual(0);
        })
    })
})