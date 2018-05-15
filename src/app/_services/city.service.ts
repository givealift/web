import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { City, User } from "../_models";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { tap } from "rxjs/operators/tap";
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import { environment } from "../../environments/environment";
import { CitiesProvider } from "../_providers/cities-provider";
import { first } from "rxjs/operator/first";


@Injectable()
export class CityService {

    private readonly url: string = `${environment.apiUrl}/city/search/`;

    constructor(private http: HttpClient, private citiesProvider: CitiesProvider) {
    }

    searchCity(cityName: string): Observable<City | null> {
        return this.searchCities(cityName, 1)
            .mergeMap(cities => {
                return of(cities[0] || null);
            })
    }

    searchCities(term: string, limit: number = 20): Observable<City[]> {
        if (!term || !term.trim()) {
            return of([]);
        }

        const localMatches: City[] = this.citiesProvider
            .getCities()
            .filter(this.startsWith(term));

        if (localMatches.length) {
            return of(localMatches.slice(0, limit));
        }

        const fetchedEntriesLimit = limit.toString();
        const params = new HttpParams({
            fromObject: {
                search: term,
                limit: fetchedEntriesLimit,
            }
        });
        return this.http.get<City[]>(this.url, { params });
    }

    private startsWith = (term: string) => (city: City) => {
        const [normalisedTerm, normalisedName] = [term, city.name]
            .map(string =>
                string
                    .normalize("NFD") // decompose to letter and diacratic symbol
                    .replace(/[\u0300-\u036f]/g, "") // remove diacratic symbols
                    .replace(/\u0142/g, "l") // 'ł' is considers as diffrent letter than 'l', so replace that too
                    .toLowerCase()
            )
        return normalisedName.startsWith(normalisedTerm);
    }
}