import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionComponent } from './subscription.component';
import { MaterialModule } from '../../_modules/material.module';
import { SubscriptionService } from '../../_services/subscription.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { DataProviderService } from '../../_services/data-provider.service';
import { CityService } from '../../_services/city.service';
import { CitiesProvider } from '../../_providers/cities-provider';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteService } from '../../_services/route.service';

describe('SubscriptionComponent', () => {
  let component: SubscriptionComponent;
  let fixture: ComponentFixture<SubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubscriptionComponent
      ],
      imports: [
        MaterialModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        SubscriptionService,
        AuthService,
        UserService,
        DataProviderService,
        CityService,
        CitiesProvider,
        RouteService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
