import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from "./user.service";
import { City, CityService } from "./city-service";
import { Moment } from "moment";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { combineLatest } from "rxjs/observable/combineLatest";
import * as moment from 'moment';

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

    private url: string = '/api/route';

    constructor(private http: HttpClient, private cityService: CityService) {
    }

    search(from: City, to: City, date: Moment): Observable<Ride[]> {

        // passed argument may not be a city object but string
        const [fromStream, toStream] = [from, to]
            .map(maybeCity => maybeCity.hasOwnProperty("cityId") ? Observable.of([maybeCity]) : this.lookForCity(maybeCity));

        combineLatest(fromStream, toStream)
            .flatMap(([fromCity, toCity]) => {
                const params = new HttpParams({
                    fromObject: {
                        from: fromCity[0].cityId,
                        to: toCity[0].cityId,
                        date: moment(date).format("YYYY-MM-DD")
                    }
                })
                return this.http.get<Ride[]>(`${this.url}/search?from=${fromCity[0].cityId}&to=${toCity[0].cityId}&date=${moment(date).format("YYYY-MM-DD")}`)
            })
            .subscribe(console.log);


        // Observable.forkJoin([fromStream, toStream]).subscribe(([foundFromCities, foundToCities]) => {
        //     // remove nested subscribe
        //     console.log("fetched from city:");
        //     console.log(foundFromCities[0]);
        //     console.log("fetched to city:");
        //     console.log(foundToCities[0]);
        // })

        return of([]);
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