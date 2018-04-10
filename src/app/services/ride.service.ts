import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "./user.service";

export class Ride {
    id: number;

    //routeInfo
    from: String;
    to: String;
    //

    driver: User;
    
    //date
    //numberOfSeats
}

@Injectable()
export class RideService {

    private userApiPath: string = '/api/rides/';

    constructor(private http: HttpClient) {
    }

    update(ride: Ride) {        
        return this.http.put<Ride>(this.userApiPath + ride.id, ride);
    }

    getById(id: number) {
        return this.http.get(this.userApiPath + id);
    }

    create(ride: Ride) {
        console.log(ride);
        return this.http.post(this.userApiPath, ride);
    }

    delete(id: number) {
        return this.http.delete(this.userApiPath + id);
    }

    getAll() {
        return this.http.get<Ride[]>(this.userApiPath + 'list');
    }

}