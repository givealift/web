import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Authentication } from "../_models/authentication";


@Injectable()
export class AuthService {
  isLoggedIn: boolean = false; //logowanie fake'owe

  private readonly authUrl: string = environment.apiUrl;
  @Output() loggedInStatus: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  login(login: string, pass: string) {
    const body = { username: login, password: pass };
    return this.http.post<Authentication>(this.authUrl + "/authenticate", body);
  }

  logout() {
    this.removeCredentials();
    this.loggedInStatus.emit(false);
  }

  isAuthenticated(): boolean {
    // TODO: check if valid jwt token & non expired
    const { token, id } = this.getCredentials();
    return token !== null && id !== null;
  }

    isAuthenticated(): boolean {
        // TODO: check if valid jwt (?) token & non expired
        // const user = JSON.parse(localStorage.getItem("currentUser")) as User;
        // return user !== null && user.token !== null;
      this.isLoggedIn = true;   //logowanie fake'owe
      return this.isLoggedIn;   //logowanie fake'owe
    }
}
