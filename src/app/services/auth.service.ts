import { Injectable, EventEmitter, Output } from "@angular/core";
import { User } from "./user.service";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {AuthToken} from "../model/auth-token";


@Injectable()
export class AuthService {

    private readonly authUrl: string = environment.apiUrl
    @Output() loggedInStatus: EventEmitter<boolean> = new EventEmitter();

    constructor(private http: HttpClient) { }

    login(login: string, pass: string) {
      console.log(login, pass);
        const body = {username : login, password : pass};
        return this.http.post<AuthToken>(this.authUrl + "authenticate", body);
    }

    logout() {
        localStorage.removeItem("currentUser");
        this.loggedInStatus.emit(false);
        console.log("Logged out!");
    }

    isAuthenticated(): boolean {
        // TODO: check if valid jwt (?) token & non expired
        const user = JSON.parse(localStorage.getItem("currentUser")) as User;
        return user !== null && user.token !== null;
    }
}
