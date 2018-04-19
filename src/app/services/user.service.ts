import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {ResponseContentType} from "@angular/http";


export class User {
    id: number;
    gender: string;
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    email: string;
    token: string;
    phone: string;
}

@Injectable()
export class UserService {

    private ApiPath: string = environment.apiUrl;

    // split into smaller services if it gets too big?

    constructor(private http: HttpClient) {
    }


    update(user: User) {
        return this.http.put<User>(this.ApiPath + "user/edit/" + 1, user);
    }

    getById(id: number) {
        return this.http.get<User>(this.ApiPath + "user/" + 1);
    }

    create(user: User) {
        console.log(user);
        return this.http.post(this.ApiPath, user);
    }

    delete(id: number) {
        return this.http.delete(this.ApiPath + id);
    }

  getPhoto(id: number) {
    return this.http.get(this.ApiPath + "user/photo/" + id,{ responseType: "blob"});
    //  .map(res => res.blob());

  }


  upload(formData: FormData, id: number) {
      const body = {file: 'asd"'};
    return this.http.post(this.ApiPath + "user/photo/" + id, formData);

  }
}
