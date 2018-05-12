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


@Injectable()
export class RouteService {

    private readonly url: string = `${environment.apiUrl}/route`;

    constructor(private http: HttpClient, private cityService: CityService) {
    }

    search(from: City, to: City, date: Moment): Observable<Route[]> {

        // passed argument may not be a city object but string
        const [fromStream, toStream] = [from, to]
            .map(maybeCity => maybeCity.hasOwnProperty("cityId") ? Observable.of(maybeCity) : this.lookForCity(maybeCity));

        return combineLatest(fromStream, toStream)
            .flatMap(([fromCity, toCity]) => {
                if (fromCity && toCity) {
                    const params = new HttpParams()
                        .set("from", fromCity.cityId)
                        .set("to", toCity.cityId)
                        .set("date", moment(date).format("YYYY-MM-DD"));

                    return this.http.get<Route[]>(`${this.url}/search`, { params: params })
                }
                return of([]);
            })
    }

    private lookForCity = (city: City): Observable<City | null> => this.cityService.searchCity(city.toString());

    update(route: Route) {
        return this.http.put<Route>(this.url + route.routeId, route);
    }

    getById(id: number, page: number) {
        return this.http.get(this.url + id);
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