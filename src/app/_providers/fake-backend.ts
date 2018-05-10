import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { Route, User } from '../_models';
import * as moment from 'moment';

let mockUsers: User[] = JSON.parse(localStorage.getItem('mock-users')) || [];
let mockRoutes: Route[] = JSON.parse(localStorage.getItem('mock-routes')) || [];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            switch (true) {
                // list routes
                case (request.url.endsWith('/api/route/list') && request.method === 'GET'):
                    return this.getRoutesList(request);

                // post route
                // case (request.url.endsWith('/api/route/') && request.method === 'POST'):
                //     return this.createRoute(request);

                // search route
                case (request.url.match(/route\/search/) && request.method === 'GET'):
                    return this.searchRoute(request);

                // // create user
                // case (request.url.endsWith('/api/user/') && request.method === 'POST'):
                //     return this.createUser(request);

                // // update user
                // case (request.url.match(/\/api\/user\/\d+$/) && request.method === 'PUT'):
                //     return this.updateUser(request);

                // // delete user
                // case (request.url.match(/\/api\/user\/\d+$/) && request.method === 'DELETE'):
                //     return this.deleteUser(request);

                // // authenticate
                // case (request.url.endsWith('/api/authenticate') && request.method === 'POST'):
                //     return this.authenticate(request);

            }

            // pass through any requests not handled above
            return next.handle(request);
        })
            .materialize() // fix-around (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .delay(500)
            .dematerialize();
    }

    // private createUser(request: HttpRequest<any>) {

    //     let newUser = request.body;

    //     // check if username already taken
    //     let duplicateUser = mockUsers.filter(user => user.login === newUser.login).length;
    //     if (duplicateUser) {
    //         return Observable.throw(`login "${newUser.login}" is already taken`);
    //     }

    //     // save new user
    //     newUser.id = mockUsers.length + 1;
    //     mockUsers.push(newUser);
    //     localStorage.setItem('mock-users', JSON.stringify(mockUsers));

    //     return Observable.of(new HttpResponse({ status: 200 }));
    // }

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

    // private authenticate(request: HttpRequest<any>) {
    //     // find user
    //     let filteredUsers = mockUsers
    //         .filter(user => user.login === request.body.login
    //             && user.password === request.body.password
    //         );

    //     if (filteredUsers.length) {
    //         let user = { ...filteredUsers[0] };
    //         user.token = 'fake-token';
    //         delete user.password;
    //         return Observable.of(new HttpResponse({ status: 200, body: user }));
    //     } else {
    //         return Observable.throw('Login or password is incorrect');
    //     }
    // }

    private createRoute(request: HttpRequest<any>) {

        let newroute = request.body;
        newroute.driver.firstName = "Test";
        newroute.driver.lastName = "Testovsky";
        newroute.id = mockRoutes.length + 1;
        mockRoutes.push(newroute);
        localStorage.setItem('mock-routes', JSON.stringify(mockRoutes));

        return Observable.of(new HttpResponse({ status: 200 }));
    }

    private createTestRoute() {
        let newroute: Route = new Route();
        newroute.routeId = mockRoutes.length + 1;
        let newDriver: User = JSON.parse(localStorage.getItem('currentUser'));
        newroute.ownerId = newDriver.id;
        newroute.from.city.cityId = "19";
        newroute.to.city.cityId = "1";

        mockRoutes.push(newroute);
        localStorage.setItem('mock-routes', JSON.stringify(mockRoutes));
    }

    private getRoutesList(request: HttpRequest<any>) {
        return Observable.of(new HttpResponse({
            status: 200, body: mockRoutes
        }));
    }

    private searchRoute(request: HttpRequest<any>) {
        let from = request.params.get("from");
        let to = request.params.get("to");
        let date = request.params.get("date");

        let matching = this.sampleroutes.filter(obj => obj.from.city.cityId == +from && obj.to.city.cityId == +to && obj.departureTime.includes(date));

        return Observable.of(new HttpResponse({ status: 200, body: matching }));
    }

    sampleroutes = [
        {
            "routeId": 203,
            "ownerId": 601,
            "from": {
                "localizationId": 201,
                "city": {
                    "cityId": 19,
                    "name": "Katowice",
                    "country": "powiat Katowice",
                    "province": "śląskie",
                    "cityInfo": {
                        "cityInfoId": 20,
                        "population": 304362,
                        "citySize": 165
                    }
                },
                "street": "krzywa",
                "buildingNumber": 4
            },
            "to": {
                "localizationId": 202,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "street": "string",
                "buildingNumber": 0
            },
            "departureTime": moment().format("YYYY-MM-DD hh:mm"),
            "numberOfSeats": 4,
            "numberOfOccupiedSeats": 1,
            "price": 10.0
        },
        {
            "routeId": 212,
            "ownerId": 601,
            "from": {
                "localizationId": 210,
                "city": {
                    "cityId": 19,
                    "name": "Katowice",
                    "country": "powiat Katowice",
                    "province": "śląskie",
                    "cityInfo": {
                        "cityInfoId": 20,
                        "population": 304362,
                        "citySize": 165
                    }
                },
                "street": "krzywa",
                "buildingNumber": 4
            },
            "to": {
                "localizationId": 211,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "street": "string",
                "buildingNumber": 0
            },
            "departureTime": moment().format("YYYY-MM-DD hh:mm"),
            "numberOfSeats": 4,
            "numberOfOccupiedSeats": 1,
            "price": 10.0
        },
        {
            "routeId": 215,
            "ownerId": 601,
            "from": {
                "localizationId": 213,
                "city": {
                    "cityId": 19,
                    "name": "Katowice",
                    "country": "powiat Katowice",
                    "province": "śląskie",
                    "cityInfo": {
                        "cityInfoId": 20,
                        "population": 304362,
                        "citySize": 165
                    }
                },
                "street": "krzywa",
                "buildingNumber": 4
            },
            "to": {
                "localizationId": 214,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "street": "string",
                "buildingNumber": 0
            },
            "departureTime": moment().add(1, "hour").format("YYYY-MM-DD hh:mm"),
            "numberOfSeats": 4,
            "numberOfOccupiedSeats": 1,
            "price": 10.0
        },
        {
            "routeId": 218,
            "ownerId": 601,
            "from": {
                "localizationId": 216,
                "city": {
                    "cityId": 1,
                    "name": "Warszawa",
                    "country": "powiat Warszawa",
                    "province": "mazowieckie",
                    "cityInfo": {
                        "cityInfoId": 2,
                        "population": 1724404,
                        "citySize": 517
                    }
                },
                "street": "krzywa",
                "buildingNumber": 0
            },
            "to": {
                "localizationId": 217,
                "city": {
                    "cityId": 19,
                    "name": "Katowice",
                    "country": "powiat Katowice",
                    "province": "śląskie",
                    "cityInfo": {
                        "cityInfoId": 20,
                        "population": 304362,
                        "citySize": 165
                    }
                },
                "street": "string",
                "buildingNumber": 4
            },
            "departureTime": moment().add(1, "hour").format("YYYY-MM-DD hh:mm"),
            "numberOfSeats": 4,
            "numberOfOccupiedSeats": 1,
            "price": 10.0
        }
    ]
}

export const FakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
