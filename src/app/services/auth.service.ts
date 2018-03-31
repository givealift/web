import { Injectable, EventEmitter, Output } from "@angular/core";
import { User } from "./user.service";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {

    private readonly authUrl: string = '/api/authenticate';
    @Output() loggedInStatus: EventEmitter<boolean> = new EventEmitter();

    constructor(private http: HttpClient) { }

    login(login: string, password: string) {
        const body = { login, password };
        return this.http.post<User>(this.authUrl, body);
    }

    logout() {
        localStorage.removeItem("currentUser");
        this.loggedInStatus.emit(false);
        console.log("Logged out!")
    }

    isAuthenticated(): boolean {
        // TODO: check if valid jwt (?) token & non expired
        const user = JSON.parse(localStorage.getItem("currentUser")) as User;
        return user !== null && user.token !== null;
    }
}