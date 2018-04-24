import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from "./user.service";
import { State } from "../city-search/city-search.component";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap } from "rxjs/operators/tap";
import { environment } from "../../environments/environment";

export class City {
    city: string;
    name: string;
    country: string;
    province: string;
    cityInfo: {
        cityInfoId: number,
        population: number,
        citySize: number
    }
}

@Injectable()
export class CityService {

    private readonly url: string = `${environment.apiUrl}/city/search/`;

    constructor(private http: HttpClient) {
    }

    searchCity(term: string): Observable<City[]> {
        if (!term.trim()) {
            return of([]);
        }
        const fetchedEntriesLimit = "20";
        const params = new HttpParams({
            fromObject: {
                search: term,
                limit: fetchedEntriesLimit,
            }

        });
        return this.http.get<City[]>(this.url, { params }).pipe(
            tap(_ => console.log(`found cities matching: ${term}`)));
    }

}