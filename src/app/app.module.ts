import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewRideComponent } from './new-ride/new-ride.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { FakeBackendProvider } from './helpers/fake-backend';
import { TokenProvider } from './helpers/token.interceptor';
import { RideListComponent } from './ride-list/ride-list.component';
import { RideComponent } from './ride-list/ride/ride.component';
import { RideService } from './services/ride.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    DashboardComponent,
    NewRideComponent,
    RideListComponent,
    RideComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    TokenProvider,
    FakeBackendProvider,
    RideService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
