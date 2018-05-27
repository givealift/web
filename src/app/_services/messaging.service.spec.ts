import { TestBed, inject } from '@angular/core/testing';

import { MessagingService } from './messaging.service';
import { HttpClientModule } from '@angular/common/http';

describe('MessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [MessagingService]
    });
  });

  it('should be created', inject([MessagingService], (service: MessagingService) => {
    expect(service).toBeTruthy();
  }));
});
