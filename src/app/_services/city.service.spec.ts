import { CityService } from "./city.service";
import { TestBed } from "@angular/core/testing";
import { CitiesProvider } from "../_providers/cities-provider";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { City } from "../_models";

class MockCitiesProvider {
    public getCities() {
        return [
            { name: "Warszawa", cityId: 1 },
            { name: "Kraków", cityId: 2 },
            { name: "Wrocław", cityId: 3 },
        ]
    }
}

describe("CityService", () => {

    let cityService: CityService;
    let httpMock: HttpTestingController;
    let citiesProviderSpy: jasmine.SpyObj<CitiesProvider>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('CitiesProvider', ['getCities']);
        TestBed.configureTestingModule({
            providers: [
                CityService,
                { provide: CitiesProvider, useValue: spy }
            ],
            imports: [
                HttpClientTestingModule
            ]
        });

        httpMock = TestBed.get(HttpTestingController);
        cityService = TestBed.get(CityService);
        citiesProviderSpy = TestBed.get(CitiesProvider);
        citiesProviderSpy.getCities.and.returnValue([]);
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

    it("#getCity(1) should return one result", () => {
        const stubValue = [
            { name: "Warszawa", cityId: 1 },
            { name: "Kraków", cityId: 2 },
            { name: "Wrocław", cityId: 3 },
        ];
        citiesProviderSpy.getCities.and.returnValue(stubValue);
        let city = cityService.get(3);
        expect(city).not.toBe(null);
        expect(city.cityId).toEqual(3);
        expect(city.name).toEqual("Wrocław");
    })

    it("#getCity(-1) should return null", () => {
        const stubValue = [
            { name: "Warszawa", cityId: 1 },
        ];
        citiesProviderSpy.getCities.and.returnValue(stubValue);
        let city = cityService.get(-1);
        expect(city).toBe(null);
    })

    it("#getAll() should return array with cities", () => {
        const stubValue = [
            { name: "Warszawa", cityId: 1 },
            { name: "Kraków", cityId: 2 },
            { name: "Wrocław", cityId: 3 },
        ];
        citiesProviderSpy.getCities.and.returnValue(stubValue);
        let cities = cityService.getAll();
        expect(cities).toEqual(jasmine.any(Array));
        expect(cities.length).toEqual(3);
    })

    it("#getAll() should return array with cities", () => {
        const stubValue = [
            { name: "Warszawa", cityId: 1 },
            { name: "Kraków", cityId: 2 },
            { name: "Wrocław", cityId: 3 },
        ];
        citiesProviderSpy.getCities.and.returnValue(stubValue);
        let cities = cityService.getAll();
        expect(cities).toEqual(jasmine.any(Array));
        expect(cities.length).toEqual(3);
    })

    it("#startsWith('ałć', 'alc') should match with accents chars", () => {
        let city = new City();
        city.name = "alc";
        let results = cityService["startsWith"]("ałć")(city);
        expect(results).toBe(true);
    })

    it("#startsWith('ALA', 'AlA') should be case-insensitive", () => {
        let city = new City();
        city.name = "AlA";
        let results = cityService["startsWith"]("ALA")(city);
        expect(results).toBe(true);
    })

    it("#startsWith('łŁ', 'Ll') should match with Ł letter", () => {
        let city = new City();
        city.name = "łŁ";
        let results = cityService["startsWith"]("Ll")(city);
        expect(results).toBe(true);
    })

    it("#startsWith('ada', 'daa') shouldn't return false", () => {
        let city = new City();
        city.name = "daa";
        let results = cityService["startsWith"]("ada")(city);
        expect(results).toBe(false);
    })
})