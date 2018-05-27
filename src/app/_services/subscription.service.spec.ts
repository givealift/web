import { TestBed, inject } from '@angular/core/testing';

import { SubscriptionService } from './subscription.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { DataProviderService } from './data-provider.service';

describe('SubscriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],

      providers: [
        SubscriptionService,
        AuthService,
        UserService,
        DataProviderService
      ]
    });
  });

  it('should be created', inject([SubscriptionService], (service: SubscriptionService) => {
    expect(service).toBeTruthy();
  }));
});
