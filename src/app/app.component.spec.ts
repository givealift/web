import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { NewRouteComponent } from './route/new-route/new-route.component';
import { AuthService } from './_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CitySearchComponent } from './city-search/city-search.component';
import { UserService } from './_services/user.service';
import { MaterialModule } from './_modules/material.module';
import { DataProviderService } from './_services/data-provider.service';
import { NotificationComponent } from './notification/notification.component';
import { MessagingService } from './_services/messaging.service';
import { SubscribeComponent } from './subscribe/subscribe.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        NewRouteComponent,
        CitySearchComponent,
        NotificationComponent,
        SubscribeComponent
      ],
      imports: [
        RouterModule.forRoot(appRoutes),
        FormsModule, HttpClientModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        AuthService,
        UserService,
        DataProviderService,
        MessagingService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
