import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from "./user.service";
import { City, CityService } from "./city-service";
import { Moment } from "moment";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { combineLatest } from "rxjs/observable/combineLatest";
import * as moment from 'moment';
import { environment } from "../../environments/environment";

export class Ride {
    id: number;

    //routeInfo
    from: String;
    to: String;
    //

    driver: User;
    date: Date;
    //date
    //numberOfSeats
}

@Injectable()
export class RideService {

    private readonly url: string = `${environment.apiUrl}/route`;

    constructor(private http: HttpClient, private cityService: CityService) {
    }

    search(from: City, to: City, date: Moment): Observable<Ride[]> {

        // passed argument may not be a city object but string
        const [fromStream, toStream] = [from, to]
            .map(maybeCity => maybeCity.hasOwnProperty("cityId") ? Observable.of([maybeCity]) : this.lookForCity(maybeCity));

        return combineLatest(fromStream, toStream)
            .flatMap(([[fromCity], [toCity]]) => {
                const params = new HttpParams()
                    .set("from", fromCity.cityId)
                    .set("to", toCity.cityId)
                    .set("date", moment(date).format("YYYY-MM-DD"));

                return this.http.get<Ride[]>(`${this.url}/search`, { params: params })
            })
    }

    private lookForCity = (city: City): Observable<City[]> => this.cityService.searchCity(city.toString(), 1);

    update(ride: Ride) {
        return this.http.put<Ride>(this.url + ride.id, ride);
    }

    getById(id: number) {
        return this.http.get(this.url + id);
    }

    create(ride: Ride) {
        console.log(ride);
        return this.http.post(this.url, ride);
    }

    delete(id: number) {
        return this.http.delete(this.url + id);
    }

    getAll() {
        return this.http.get<Ride[]>(this.url + 'list');
    }

}