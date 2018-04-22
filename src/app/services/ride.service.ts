import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from "./user.service";
import { environment } from "../../environments/environment";
import { Ride } from "../model/ride";


@Injectable()
export class RideService {

    private readonly apiUrl: string = environment.apiUrl

    constructor(private http: HttpClient) {
    }


    getUserRides(id: number, page: number) {
        let params = new HttpParams();
        params.append('page', page.toLocaleString());
        return this.http.get(this.apiUrl + "user/route/" + id, { params: params });
    }

    update(ride: Ride, id: number) {
        return this.http.put<Ride>(this.apiUrl + id, ride);
    }

    getById(id: number) {
        return this.http.get(this.apiUrl + id);
    }

    create(ride: Ride) {
        console.log(ride);
        return this.http.post(this.apiUrl, ride);
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl + id);
    }

    getAll() {
        return this.http.get<Ride[]>(this.apiUrl + 'route');
    }

}
