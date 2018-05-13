import { CityService } from "./city.service";
import { TestBed } from "@angular/core/testing";
import { CitiesProvider } from "../_providers/cities-provider";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe("CityService", () => {

    let cityService: CityService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CityService,
                CitiesProvider
            ],
            imports: [
                HttpClientTestingModule
            ]
        });

        httpMock = TestBed.get(HttpTestingController);
        cityService = TestBed.get(CityService);
    })

    afterEach(() => {
        // Assert that there are no more pending requests.
        httpMock.verify();
    });

    it("#searchCity('Warszawa') should return one city if exists", () => {
        const cityName = "Warszawa";
        cityService.searchCity(cityName).subscribe(city => {
            expect(city).toBeDefined();
            expect(city.name).toEqual(cityName);
        })

        const req = httpMock.expectOne(
            req => req.params.has("search")
        );

        const mockedResponse = [{ name: "Warszawa", cityId: 1 }];
        req.flush(mockedResponse);
    })

    it("#searchCity('ZXC') should return null if city doesn't exists", () => {
        const cityName = "ZXC";
        cityService.searchCity(cityName).subscribe(city => {
            expect(city).toBe(null);
        })

        const req = httpMock.expectOne(
            req => req.params.get("search") === cityName
        );

        const mockedResponse = [];
        req.flush(mockedResponse);
    })

    it("#searchCities('Wraszawa') should return array with one item if found", () => {
        const cityName = "Warszawa";
        cityService.searchCities(cityName, 1).subscribe(cities => {
            expect(cities).toEqual(jasmine.any(Array));
            expect(cities.length).toEqual(1);
            expect(cities[0].name).toEqual(cityName);
        })

        const req = httpMock.expectOne(
            req => req.params.has("search")
        );

        const mockedResponse = [{ name: "Warszawa", cityId: 1 }];
        req.flush(mockedResponse);
    })

    it("#searchCities('ZXC') should return empty array if not found", () => {
        const cityName = "ZXC";
        cityService.searchCities(cityName, 1).subscribe(cities => {
            expect(cities).toEqual(jasmine.any(Array));
            expect(cities.length).toEqual(0);
        })

        const req = httpMock.expectOne(
            req => req.params.has("search")
        );

        const mockedResponse = [];
        req.flush(mockedResponse);
    })
})