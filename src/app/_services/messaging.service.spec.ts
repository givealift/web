import { TestBed, inject } from '@angular/core/testing';

import { MessagingService } from './messaging.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { DataProviderService } from './data-provider.service';

describe('MessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        MessagingService,
        AuthService,
        UserService,
        DataProviderService
      ]
    });
  });

  it('should be created', inject([MessagingService], (service: MessagingService) => {
    expect(service).toBeTruthy();
  }));
});
