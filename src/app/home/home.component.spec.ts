import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthService } from '../_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../_modules/material.module';
import { CitySearchComponent } from '../city-search/city-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CityService } from '../_services/city.service';
import { RouteService } from '../_services/route.service';
import { CitiesProvider } from '../_providers/cities-provider';
import { DataProviderService } from '../_services/data-provider.service';
import { MessagingService } from '../_services/messaging.service';
import { SubscribeComponent } from '../subscribe/subscribe.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        CitySearchComponent,
        SubscribeComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthService,
        UserService,
        CityService,
        RouteService,
        CitiesProvider,
        MessagingService,
        DataProviderService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Give-a-lift'`, async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Give-a-lift');
  }));

});
