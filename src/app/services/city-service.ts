import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from "./user.service";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap } from "rxjs/operators/tap";
import { environment } from "../../environments/environment";
import { CitiesProvider } from "../providers/cities-provider";

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

@Injectable()
export class CityService {

    private readonly url: string = `${environment.apiUrl}/city/search/`;

    constructor(private http: HttpClient, private citiesProvider: CitiesProvider) {
    }

    searchCity(term: string, limit: number = 20): Observable<City[]> {
        if (!term || !term.trim()) {
            return of([]);
        }

        const localMatches: City[] = this.citiesProvider
            .getCities()
            .filter(this.startsWith(term));

        if (localMatches.length) {
            return of(localMatches);
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