import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { CityService } from "./city.service";
import { Moment } from "moment";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { combineLatest } from "rxjs/observable/combineLatest";
import * as moment from 'moment';
import { environment } from "../../environments/environment";
import { City, Route, User } from "../_models/";

type InterchangeRoute = Route[];

@Injectable()
export class RouteService {

    private readonly url: string = `${environment.apiUrl}/route`;

    constructor(private http: HttpClient, private cityService: CityService) {
    }

    private _search<T>(from: string, to: string, date: Moment, withInterchange: boolean = false): Observable<T> {

        const url = `${this.url}/${withInterchange ? "searchInterchanges" : "search"}`;
        const [fromStream, toStream] = [from, to].map(this.lookForCity);

        return combineLatest(fromStream, toStream)
            .flatMap<any, any>(([fromCity, toCity]) => {
                if (fromCity && toCity) {
                    const params = new HttpParams()
                        .set("from", fromCity.cityId.toString())
                        .set("to", toCity.cityId.toString())
                        .set("date", moment(date).format("YYYY-MM-DD"));

                    return this.http.get<T>(url, { params: params });
                }
                return of([]);
            });
    }

    search(from: string, to: string, date: Moment): Observable<Route[]> {
        return this._search<Route[]>(from, to, date, false);
    }

    searchWithInterchange(from: string, to: string, date: Moment): Observable<InterchangeRoute[]> {
        return this._search<InterchangeRoute[]>(from, to, date, true);
    }

    _searchWithIds<T>(from: number, to: number, date: Moment | string, withInterchange: boolean = false): Observable<T> {
        const url = `${this.url}/${withInterchange ? "searchInterchanges" : "search"}`;
        const params = new HttpParams()
            .set("from", from.toString())
            .set("to", to.toString())
            .set("date", moment(date).format("YYYY-MM-DD"));

        return this.http.get<T>(url, { params: params });
    }

    searchByIds(from: number, to: number, date: Moment | string): Observable<Route[]> {
        return this._searchWithIds<Route[]>(from, to, date, false);
    }

    searchByIdsWithInterchange(from: number, to: number, date: Moment | string): Observable<InterchangeRoute[]> {
        return this._searchWithIds<InterchangeRoute[]>(from, to, date, true);
    }

    private lookForCity = (city: string): Observable<City | null> => this.cityService.searchCity(city);

    update(route: Route) {
        return this.http.put<Route>(this.url + route.routeId, route);
    }

    getById(id: number) {
        return this.http.get<Route>(this.url + '/' + id);
    }

    create(route: Route) {
        console.log(route);
        return this.http.post(this.url, route);
    }

    delete(id: number) {
        return this.http.delete(this.url + id);
    }

    getAll() {
        return this.http.get<Route[]>(this.url + '/list');
    }

}
