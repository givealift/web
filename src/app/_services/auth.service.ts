import {EventEmitter, Injectable, Output} from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Authentication} from "../_models/authentication";
import {UserService} from "./user.service";
import {Route} from "../_models";


@Injectable()
export class AuthService {

  private readonly authUrl: string = environment.apiUrl;
  @Output() loggedInStatus: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private userService: UserService) { }

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

  public storeCredentials(credentials: Authentication) {
    console.log(credentials);

    localStorage.setItem("token", credentials.token);
    localStorage.setItem("id", credentials.userId);
  }

  public getCredentials(): { token: string | null, id: string | null } {
    return {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id")
    };
  }

  public removeCredentials() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  resetPassword(email: string) {
    return this.http.post(this.authUrl + "/user/send-reset-email/" + email, {});
  }

  changePassword(id: string, token: string, password: string) {
    let params = new HttpParams().set('id', id.toLocaleString()).set('token', token.toLocaleString());
    // params.append('id', id.toLocaleString());
    //params.append('token', token.toLocaleString());
    return this.http.put<Route[]>(this.authUrl + "/user/edit/password", password, {params: params});
  }

}
