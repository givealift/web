import { TestBed, inject } from '@angular/core/testing';

import { SubscriptionService } from './subscription.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { DataProviderService } from './data-provider.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CityService } from './city.service';
import { CitiesProvider } from '../_providers/cities-provider';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubscriptionService', () => {
  let subscriptionService: SubscriptionService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,        
      ],

      providers: [
        SubscriptionService,
        CityService,
        CitiesProvider,
        AuthService,
        UserService,
        DataProviderService,
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    subscriptionService = TestBed.get(SubscriptionService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([SubscriptionService], (service: SubscriptionService) => {
    expect(service).toBeTruthy();
  }));

  it('#getAll should return all subscriptions', () => {
    subscriptionService.getAll().subscribe(subscriptions => {
      expect(subscriptions).toEqual(jasmine.any(Array));
      expect(subscriptions.length).toEqual(2);
    })

    const req = httpMock.expectOne(
      req => req.url.includes("subscription")
    );

    const mockedResponse = [
      {
        "subscriber": "101",
        "email": "101",
        "from": {
          "cityId": 1
        },
        "to": {
          "cityId": 33
        },
        "date": "2018-05-28T00:00:00.000+0000",
        "routeId": null,
        "notificationType": null
      },
      {
        "subscriber": "101",
        "email": "101",
        "from": {
          "cityId": 1
        },
        "to": {
          "cityId": 33
        },
        "date": "2018-05-28T00:00:00.000+0000",
        "routeId": null,
        "notificationType": null
      }
    ];

    req.flush(mockedResponse);
  })

  it('#getUserSubscription should return only given user subscriptions', () => {
    const userId = "20";
    subscriptionService.getUserSubscriptions(userId)
      .subscribe(subscriptions => {
        expect(subscriptions).toEqual(jasmine.any(Array));
        expect(subscriptions.length).toEqual(2);
        expect(subscriptions[0].subscriber).toEqual(userId);
        expect(subscriptions[1].subscriber).toEqual(userId);
      })

    const req = httpMock.expectOne(
      req => req.url.includes("subscription")
    );

    const mockedResponse = [
      {
        "subscriber": "20",
        "email": "101",
        "from": {
          "cityId": 1
        },
        "to": {
          "cityId": 33
        },
        "date": "2018-05-28T00:00:00.000+0000",
        "routeId": null,
        "notificationType": null
      },
      {
        "subscriber": "101",
        "email": "101",
        "from": {
          "cityId": 1
        },
        "to": {
          "cityId": 33
        },
        "date": "2018-05-28T00:00:00.000+0000",
        "routeId": null,
        "notificationType": null
      },
      {
        "subscriber": "20",
        "email": "101",
        "from": {
          "cityId": 1
        },
        "to": {
          "cityId": 33
        },
        "date": "2018-05-28T00:00:00.000+0000",
        "routeId": null,
        "notificationType": null
      }
    ];
    req.flush(mockedResponse);
  })
});
