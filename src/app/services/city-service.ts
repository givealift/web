import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from "./user.service";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap } from "rxjs/operators/tap";
import { environment } from "../../environments/environment";

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

    constructor(private http: HttpClient) {
    }

    searchCity(term: string, limit: number = 20): Observable<City[]> {
        if (!term || !term.trim()) {
            return of([]);
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
}