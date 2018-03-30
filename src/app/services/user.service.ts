import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Injectable()
export class UserService {

    // split into smaller services if it gets too big?

    constructor(private http: HttpClient) {
    }

    create(user: User){

    }

}