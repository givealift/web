import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

export class User {
    gender: string;
    firstName: string;
    lastName: string;
    login: string;
    pass: string;
}

@Injectable()
export class UserService {

    // split into smaller services if it gets too big?

    constructor(private http: HttpClient) {
    }

    //update
    //delete
    //get
    //getAll
    
    create(user: User){
        console.log(user);
        return this.http.post('/api/user', user);
    }

}