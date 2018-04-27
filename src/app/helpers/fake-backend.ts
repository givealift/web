import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { User } from '../services/user.service';
import {Ride} from "../model/ride";
import {materialize} from "rxjs/operators";


let mockUsers: User[] = JSON.parse(localStorage.getItem('mock-users')) || [];
let mockRides: Ride[] = JSON.parse(localStorage.getItem('mock-rides')) || [];
@Injectable()
export class FakeBackendInterceptor  {

    constructor() { }

   // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     // wrap in delayed observable to simulate server api call
     // return Observable.of(null).mergeMap(() => {
     //
     //      // create user
     // !*      if (request.url.endsWith('/api/user/') && request.method === 'POST') {
     //          return this.createUser(request);
     //      }
     //
     //      // update user
     //      if (request.url.match(/\/api\/user\/\d+$/) && request.method === 'PUT') {
     //          return this.updateUser(request);
     //      }
     //
     //      // delete user
     //      if (request.url.match(/\/api\/user\/\d+$/) && request.method === 'DELETE') {
     //          return this.deleteUser(request);
     //      }
     //
     //      // authenticate
     //      if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
     //          return this.authenticate(request);
     //      }
     //
     //     if (request.url.endsWith('/api/rides/list') && request.method === 'GET') {
     //          return this.getRidesList(request);
     //      }
     //
     //      if (request.url.endsWith('/api/rides/') && request.method === 'POST') {
     //          return this.createRide(request);
     //      }
     //
     //      // pass through any requests not handled above
     //      return next.handle(request);
     //  })
  /* .
     materialize() // fix-around (https://github.com/Reactive-Extensions/RxJS/issues/648)
       .delay(500)
       .dematerialize();*/
  // }



    private createUser(request: HttpRequest<any>) {

        let newUser = request.body;

        // check if username already taken
        let duplicateUser = mockUsers.filter(user => user.login === newUser.login).length;
        if (duplicateUser) {
            return Observable.throw(`login "${newUser.login}" is already taken`);
        }

        // save new user
        newUser.id = mockUsers.length + 1;
        mockUsers.push(newUser);
        localStorage.setItem('mock-users', JSON.stringify(mockUsers));

        return Observable.of(new HttpResponse({ status: 200 }));
    }

    private updateUser(request: HttpRequest<any>) {

        let newUserData: User = request.body;
        let urlParts = request.url.split('/');
        let id = +urlParts[urlParts.length - 1];

        let index = mockUsers.findIndex(user => user.id === id);

        if (index > -1) {
            let oldUserData = mockUsers[index];
            mockUsers[index] = Object.assign({}, oldUserData, newUserData);
        }

        localStorage.setItem('mock-users', JSON.stringify(mockUsers));

        return Observable.of(new HttpResponse({ status: 200, body: mockUsers[index] }));
    }

    private deleteUser(request: HttpRequest<any>) {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-token') {

            let urlParts = request.url.split('/');
            let id = +urlParts[urlParts.length - 1];

            let index = mockUsers.findIndex(user => user.id === id);

            mockUsers.splice(index, 1);
            localStorage.setItem('mock-users', JSON.stringify(mockUsers));

            // respond 200 OK
            return Observable.of(new HttpResponse({ status: 200 }));
        } else {
            // return 401 not authorised if token is null or invalid
            return Observable.throw('Unauthorised');
        }
    }

    private authenticate(request: HttpRequest<any>) {
        // find user
        let filteredUsers = mockUsers
            .filter(user => user.login === request.body.login
                && user.password === request.body.password
            );

        if (filteredUsers.length) {
            let user = { ...filteredUsers[0] };
            user.token = 'fake-token';
            delete user.password;
            return Observable.of(new HttpResponse({ status: 200, body: user }));
        } else {
            return Observable.throw('Login or password is incorrect');
        }
    }

    private createRide(request: HttpRequest<any>) {

        let newRide = request.body;
        newRide.driver.firstName="Test";
        newRide.driver.lastName="Testovsky";
        newRide.id = mockRides.length + 1;
        mockRides.push(newRide);
        localStorage.setItem('mock-rides', JSON.stringify(mockRides));

        return Observable.of(new HttpResponse({ status: 200 }));
    }

    // private createTestRide() {
    //   let newRide: Ride ;
    //     newRide.id = mockRides.length + 1;
    //     let newDriver: User = JSON.parse(localStorage.getItem('currentUser'));
    //     newRide.driver = newDriver;
    //     newRide.from = "Kraków";
    //     newRide.to = "Warszawa";
    //
    //     mockRides.push(newRide);
    //     localStorage.setItem('mock-rides', JSON.stringify(mockRides));
    // }
    //
    // private getRidesList(request: HttpRequest<any>) {
    //     return Observable.of(new HttpResponse({
    //         status: 200, body: mockRides
    //     }));
    // }
}
/*

export const FakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
*/
