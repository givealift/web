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
import * as firebase from "firebase";
import { isNullOrUndefined } from "util";
import { RouteService } from "../_services/route.service";
import { UserService } from "../_services/user.service";

let mockUsers: User[] = JSON.parse(localStorage.getItem('mock-users')) || [];
let mockRoutes: Route[] = JSON.parse(localStorage.getItem('mock-routes')) || [];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor( private routeService: RouteService,
               private userService: UserService
  ) { }

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
        // case (request.url.match(/route\/search/) && request.method === 'GET'):
        //     return this.searchRoute(request);

        case (request.url.match(/api\/user\/favourites\/\d+/) && request.method === 'GET'):
          console.log("getUserFav case catch");
          return this.getUserFavourites(request);

        // case (request.url.endsWith('/api/user/favourites/add/128') && request.method === 'POST'): {
        case (request.url.match(/api\/user\/favourites\/add\/\d+/) && request.method === 'POST'): {
          // /api/user/favourites/add/128
          // /api/user/favourites/add/{routeId}
          console.log("case caught!");
          return this.addRouteToUsersFavourites(request);
        }

        // case (request.url.match(/route\/\d+/) && request.method === 'GET'):
        //     return this.getById(request);

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

  // private getById(request: HttpRequest<any>) {
  //     request.toString();
  //     let RouteId: Array<number> = [-404];
  //     let splittedUrl: string[] = request.url.split("\/");
  //     for (let s of splittedUrl) {
  //         console.log('fakebackend.s of splittedUrl=', s);
  //     }
  //     if (splittedUrl.length === 9) {
  //         let RouteIdNumber: number = parseInt(splittedUrl[8]);
  //         RouteId = [RouteIdNumber];
  //     } else {
  //         RouteId = [-404];
  //     }
  //     console.log('fakebackend.getById(', RouteId, ')');
  //     let routeDetails = this.sampleroutes.filter(
  //         route => {
  //             return RouteId.indexOf(route.routeId) !== -1;
  //         }
  //     );
  //     console.log('fakebackend.getById: routeDetals = ', routeDetails);
  //     return Observable.of(new HttpResponse({ status: 200, body: routeDetails }));
  // }

  private getFavRoutesFromLocalStorage() {
      let userFavouriteIds: Array<number> = [];
      if ( this.isLocalStorageSupported() ) {
          if ( isNullOrUndefined( JSON.parse(localStorage.getItem('lsFavouriteRoutes')) ) ) {
              userFavouriteIds = this.sampleFavRoutes;
              localStorage.setItem('lsFavouriteRoutes', JSON.stringify(userFavouriteIds));
          }
          else {
              if ( JSON.parse(localStorage.getItem('lsFavouriteRoutes')).length === 0  ) {
                userFavouriteIds = this.sampleFavRoutes;
                localStorage.setItem('lsFavouriteRoutes', JSON.stringify(userFavouriteIds));
              }
              else {
                userFavouriteIds = JSON.parse(localStorage.getItem('lsFavouriteRoutes'));
              }
          }
      }
      else {
          userFavouriteIds = this.sampleFavRoutes;
      }
      console.log("userFavouriteIds = ", userFavouriteIds); /** **/
      return userFavouriteIds;
  }

  isLocalStorageSupported() {
      try {
          let itemBackup = localStorage.getItem("");
          localStorage.removeItem("");
          localStorage.setItem("", itemBackup);
          if (itemBackup === null)
              localStorage.removeItem("");
          else
              localStorage.setItem("", itemBackup);
          return true;
      }
      catch (e) {
          return false;
      }
  }

  private setFavRoutesToLocalStorage( userFavouriteIds: Array<number> = [] ) {
      if ( this.isLocalStorageSupported() ) {
          localStorage.setItem('lsFavouriteRoutes', JSON.stringify(userFavouriteIds));
      }
      else {
          throw new Error("LOCAL STORAGE IS NOT SUPPORTED");
      }
      console.log("userFavouriteIds = ", userFavouriteIds); /** **/
      return userFavouriteIds;
  }

  private getUserFavourites(request: HttpRequest<any>) {
    let userFavouriteIds = this.getFavRoutesFromLocalStorage();
    let tmpUserFavouriteIds = userFavouriteIds;
    let favRoutes = this.sampleroutes.filter(
      route => {
        return userFavouriteIds.indexOf(route.routeId) !== -1;
      }
    );
    console.log('fakebackend.getUserFavourites: fake favRoutes = ', favRoutes);
    console.log('fakebackend.getUserFavourites: all tmpUserFavouriteIds = ', tmpUserFavouriteIds);
    return Observable.of(new HttpResponse({ status: 200, body: favRoutes }));
  }

  private addRouteToUsersFavourites(request: HttpRequest<any>) {
    let userFavouriteIds = this.getFavRoutesFromLocalStorage();

    // /api/user/favourites/add/{routeId}
    let splitedUrl = request.url.split("\/");
    let reqLength = 11;
    console.log("request.url = ", request.url);   /** **/
    console.log("splitedUrl = ", splitedUrl);     /** **/
    let addedRoute: number = -404;
    if ( splitedUrl.length === reqLength ) {
      addedRoute = parseInt( splitedUrl[ reqLength-1 ] );
    }
    else {
      addedRoute = -404;
    }
    userFavouriteIds.push( addedRoute );
    this.setFavRoutesToLocalStorage( userFavouriteIds );
    console.log("sampleFavRoutes = ", this.getFavRoutesFromLocalStorage());
    // this.getUserFavourites( request );           /** **/
    console.log('fakebackend.addRouteToUsersFavourites: addedRoute = ', addedRoute);
    return Observable.of(new HttpResponse({ status: 200, body: addedRoute }));
  }

  private createUser(request: HttpRequest<any>) {

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
  }

  private updateUser(request: HttpRequest<any>) {

    let newUserData: User = request.body;
    let urlParts = request.url.split('/');
    let id = +urlParts[urlParts.length - 1];

    let index = mockUsers.findIndex(user => user.userId === id);

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

      let index = mockUsers.findIndex(user => user.userId === id);

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
    newroute.ownerId = newDriver.userId;
    newroute.from.city.cityId = 19;
    newroute.to.city.cityId = 1;
  }

  //     mockRoutes.push(newroute);
  //     localStorage.setItem('mock-routes', JSON.stringify(mockRoutes));
  // }

  private getRoutesList(request: HttpRequest<any>) {
    return Observable.of(new HttpResponse({
      status: 200, body: mockRoutes
    }));
  }

  private searchRoute(request: HttpRequest<any>) {
    let from = request.params.get("from");
    let to = request.params.get("to");
    let date = request.params.get("date");

    let matching = this.sampleroutes.filter(obj => obj.from.city.cityId === +from && obj.to.city.cityId == +to && obj.date.includes(date));

    return Observable.of(new HttpResponse({ status: 200, body: matching }));
  }

  sampleFavRoutes = [203, 212];

  sampleroutes = [
    {
      "description":"My description is... this is a mock 1! ",
      "routeId": 203,
      "ownerId": 102,
      "from": {
        "localizationId": 201,
        "date": moment().format("YYYY-MM-DD hh:mm"),
        "city": {
          "cityId": 19,
          "name": "Katowice",
          "country": "powiat Katowice",
          "province": "śląskie",
          "cityInfo": {
            "cityInfoId": 20,
            "population": 304362,
            "citySize": 165
          },
        },
        "street": "krzywa",
        "buildingNumber": 4,
        "placeOfMeeting":"Katowicka 16"
      },
      "to": {
        "localizationId": 202,
        "date": moment().add(3, "hour").format("YYYY-MM-DD hh:mm"),
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
        "buildingNumber": 0,
        "placeOfMeeting":"Złote Tarasy 7"
      },
      "numberOfSeats": 4,
      "numberOfOccupiedSeats": 1,
      "passengers": [ 1 ],
      "price": 10.0,
      "stops": [
        {
          "buildingNumber": 16,
          "city": {
            "cityId": "22",
            "name": "Łódź",
            "country": "powiat Warszawa",
            "province": "mazowieckie",
            "cityInfo": {
              "cityInfoId": 2,
              "population": 1724404,
              "citySize": 518
            }
          },
          "date": "2018-05-13T23:10:00+0000",
          "localizationId": 221,
          "placeOfMeeting": "Płynna 14"
        },
      ],
      "date": moment().format("YYYY-MM-DD hh:mm")
    },
    {
      "description":"My description is... this is a mock 2! ",
      "routeId": 212,
      "ownerId": 108,
      "from": {
        "localizationId": 210,
        "date": moment().add(3, "hour").format("YYYY-MM-DD hh:mm"),
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
        "date": moment().add(6, "hour").format("YYYY-MM-DD hh:mm"),
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
      "date": moment().add(3, "hour").format("YYYY-MM-DD hh:mm"),
      "numberOfSeats": 4,
      "numberOfOccupiedSeats": 1,
      "price": 10.0,
      "stops": []
    },
    {
      "description":"My description is... this is a mock 3! ",
      "routeId": 215,
      "ownerId": 107,
      "from": {
        "date": moment().add(3, "hour").add(30, "m").format("YYYY-MM-DD hh:mm"),
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
        "date": moment().add(6, "hour").add(45, "m").format("YYYY-MM-DD hh:mm"),
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
      "date": moment().add(4, "hour").add(30, "m").format("YYYY-MM-DD hh:mm"),
      "numberOfSeats": 4,
      "numberOfOccupiedSeats": 3,
      "passengers": [ 101, 201, 301 ],
      "price": 10.0,
      "stops": null
    },
    {
      "description":"My description is... this is a mock 4! ",
      "routeId": 218,
      "ownerId": 101,
      "from": {
        "localizationId": 216,
        "date": moment().add(3, "hour").add(15, "m").format("YYYY-MM-DD hh:mm"),
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
        "buildingNumber": 0,
        "placeOfMeeting":"Złote Tarasy 7"
      },
      "to": {
        "localizationId": 217,
        "date": moment().add(5, "hour").add(45, "m").format("YYYY-MM-DD hh:mm"),
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
        "buildingNumber": 4,
        "placeOfMeeting":"Katowicka 16"
      },
      "date": moment().add(3, "hour").add(15, "m").format("YYYY-MM-DD hh:mm"),
      "numberOfSeats": 4,
      "numberOfOccupiedSeats": 2,
      "passengers": [ 102, 103 ],
      "price": 10.0,
      "stops": [
        {
          "buildingNumber": 11,
          "city": {
            "cityId": "20",
            "name": "Częstochowa",
            "country": "powiat Katowice",
            "province": "śląskie",
            "cityInfo": {
              "cityInfoId": 20,
              "population": 304362,
              "citySize": 165
            }
          },
          "date": moment().add(3, "hour").add(55, "m").format("YYYY-MM-DD hh:mm"),
          "localizationId": 201,
          "placeOfMeeting": "Krzywa 4"
        },
        {
          "buildingNumber": 16,
          "city": {
            "cityId": "23",
            "name": "Radomkso",
            "country": "powiat Warszawa",
            "province": "mazowieckie",
            "cityInfo": {
              "cityInfoId": 2,
              "population": 1724404,
              "citySize": 517
            }
          },
          "date": moment().add(4, "hour").add(35, "m").format("YYYY-MM-DD hh:mm"),
          "localizationId": 217,
          "placeOfMeeting": "Wyszyńskiego 7"
        }
      ]
    }
  ];
}

export const FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
