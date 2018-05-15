import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Route, User } from "../_models";
import { DataProviderService } from "./data-provider.service";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators/tap";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { of } from "rxjs/observable/of";


@Injectable()
export class UserService {

  private ApiPath: string = environment.apiUrl;

  // split into smaller services if it gets too big?

  constructor(private http: HttpClient, private dataProviderService: DataProviderService) {
  }

  getUserRides(id: number, page: number) {
    let params = new HttpParams().set('page', (page - 1).toLocaleString());
    return this.http.get<Route[]>(this.ApiPath + "/user/route/" + id, { params: params });
  }

  update(user: User, userId: number) {
    return this.http.put<User>(this.ApiPath + "/user/edit/" + userId, user);
  }

  getById(id: number): Observable<User> {
    let possibleUserData = this.dataProviderService.getData(`user/${id}`);

    if (possibleUserData) {
      return of(possibleUserData);
    }

    return this.http
      .get<User>(`${this.ApiPath}/user/${id}`, { observe: 'response' })
      .pipe(
        map(res => res.status === 204 ? null : res.body),
        tap(data => {
          if (data) {
            this.dataProviderService.storeData(`user/${id}`, data);
          }
        }),
        catchError(_ => of(null)));
  }

  create(user: User) {
    console.log(user);
    return this.http.post(this.ApiPath + "/user/signup", user);
  }

  delete(id: number) {
    return this.http.delete(this.ApiPath + "/" + id);
  }

  getPhoto(id: number) {
    return this.http.get(this.ApiPath + "/user/photo/" + id, { responseType: "blob" });
    //  .map(res => res.blob());
  }

  upload(formData: FormData, id: number) {
    const body = { file: 'asd"' };
    return this.http.post(this.ApiPath + "/user/photo/" + id, formData);
  }

  saveLoggedUserData(id: number) {
    this.http.get<User>(this.ApiPath + "/user/" + id).subscribe(
      data => {
        this.dataProviderService.storeData('user/' + id, data);
      }
    );
  }

  getUserFavourites(userId: number) {
    return this.http.get(this.ApiPath + '/user/favourites/' + userId);
  }

}
