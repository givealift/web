import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Route, User} from "../_models";


@Injectable()
export class UserService {

    private ApiPath: string = environment.apiUrl;

    // split into smaller services if it gets too big?

    constructor(private http: HttpClient) {
    }

    getUserRides(id: number, page: number) {
        let params = new HttpParams();
        params.append('page', page.toLocaleString());
      return this.http.get<Route[]>(this.ApiPath + "/user/rout/" + id, {params: params});

    }

  update(user: User, userId: number) {
    return this.http.put<User>(this.ApiPath + "/user/edit/" + userId, user);
    }

    getById(id: number) {
      return this.http.get<User>(this.ApiPath + "/user/" + id);
    }

    create(user: User) {
        console.log(user);
        return this.http.post(this.ApiPath, user);
    }

    delete(id: number) {
      return this.http.delete(this.ApiPath + "/" + id);
    }

    getPhoto(id: number) {
      return this.http.get(this.ApiPath + "/user/photo/" + id, {responseType: "blob"});
        //  .map(res => res.blob());

    }

    upload(formData: FormData, id: number) {
        const body = { file: 'asd"' };
        return this.http.post(this.ApiPath + "user/photo/" + id, formData);

    }
}
