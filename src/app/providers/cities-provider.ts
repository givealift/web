import { Injectable } from "@angular/core";
import { City } from "../services/city-service";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment";

@Injectable()
export class CitiesProvider {

    private cities: City[] = null;
    private readonly FETCH_LIMIT = 500;

    constructor(private http: HttpClient) { }

    public getCities(): City[] {
        return this.cities;
    }

    load() {
        return new Promise((resolve, reject) => {
            const savedCities = <City[]>JSON.parse(localStorage.getItem("cities"));

            if (savedCities !== null && savedCities.length >= 100) {
                this.cities = savedCities;
                resolve(true);
                return;
            }

            const URL = `${env.apiUrl}/city`;
            this.http.get<City[]>(URL)
                .subscribe(cities => {
                    this.cities = cities;
                    localStorage.setItem("cities", JSON.stringify(cities));
                    resolve(true);
                })
        })
    }
}