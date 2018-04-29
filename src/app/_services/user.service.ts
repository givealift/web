import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../_models";


@Injectable()
export class UserService {

    private userApiPath: string = '/api/user/';

    // split into smaller services if it gets too big?

    constructor(private http: HttpClient) {
    }

    update(user: User) {        
        return this.http.put<User>(this.userApiPath + user.id, user);
    }

    getById(id: number) {
        return this.http.get(this.userApiPath + id);
    }

    create(user: User) {
        console.log(user);
        return this.http.post(this.userApiPath, user);
    }

    delete(id: number) {
        return this.http.delete(this.userApiPath + id);
    }
}