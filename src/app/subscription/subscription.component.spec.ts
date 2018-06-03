import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionComponent } from './subscription.component';
import { MaterialModule } from '../_modules/material.module';
import { SubscriptionService } from '../_services/subscription.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { DataProviderService } from '../_services/data-provider.service';
import { CityService } from '../_services/city.service';
import { CitiesProvider } from '../_providers/cities-provider';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteService } from '../_services/route.service';
import { RouteSubscription } from '../_models/route-subscription';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

describe('SubscriptionComponent', () => {
  let component: SubscriptionComponent;
  let fixture: ComponentFixture<SubscriptionComponent>;

  beforeEach(async(() => {
    registerLocaleData(localePl);

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
    component.subData = new RouteSubscription();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
