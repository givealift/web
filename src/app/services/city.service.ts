import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap } from "rxjs/operators/tap";
import { catchError } from "rxjs/operators";



@Injectable()
export class CityService {

    private url: string = '/city';

    constructor(private http: HttpClient) {
    }

    searchCity(term: string): Observable<string[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.http.get<string[]>(`${this.url}/search/?name=${term}`).pipe(
            tap(_ => console.log(`found cities matching ${term}`)));
    }
}