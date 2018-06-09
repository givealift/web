import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './_modules/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { RouteComponent } from './route/route/route.component';
import { NewRouteComponent } from './route/new-route/new-route.component';
import { RouteListComponent } from './route/route-list/route-list.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { AuthGuard } from './_services/auth-guard.service';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { CityService } from './_services/city.service';
import { RouteService } from './_services/route.service';
import { CitiesProvider, citiesProviderFactory } from './_providers/cities-provider';
import { TokenProvider } from './_providers/token.interceptor';
import { FakeBackendProvider } from './_providers/fake-backend';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserInfoComponent } from './user-profile/user-info/user-info.component';
import { MatIconRegistry, MatSnackBarModule } from '@angular/material';
import { UserRouteComponent } from './user-profile/user-route/user-route.component';
import { UserEditFormComponent } from './user-profile/user-edit-form/user-edit-form.component';
import { PaginationComponent } from './shered/pagination/pagination.component';
import { FavouriteRoutesComponent } from './user-profile/favourite-routes/favourite-routes.component';
import { RouteDetailsComponent } from './route/route-details/route-details.component';
import { DataProviderService } from './_services/data-provider.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerProvider } from './_providers/spinner-provider';
import { NotificationComponent } from './notification/notification.component';
import { MessagingService } from './_services/messaging.service';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserSubscriptionsComponent } from './user-profile/user-subscriptions/user-subscriptions.component';
import { SubscriptionService } from './_services/subscription.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RatingComponent } from './rating/rating.component';
import { RatingProvider } from './_providers/rating-provider';
import { RouteSearchComponent } from './route/route-search/route-search.component';
import { RouteList2Component } from './route/route-list2/route-list2.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    RouteListComponent,
    NewRouteComponent,
    RouteListComponent,
    CitySearchComponent,
    RouteComponent,
    UserProfileComponent,
    UserRouteComponent,
    UserInfoComponent,
    UserEditFormComponent,
    PaginationComponent,
    FavouriteRoutesComponent,
    RouteDetailsComponent,
    SpinnerComponent,
    SubscriptionComponent,
    UserSubscriptionsComponent,
    NotificationComponent,
    SubscribeComponent,
    ChangePasswordComponent,
    RatingComponent,
    RouteSearchComponent,
    RouteList2Component
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CityService,
    TokenProvider,
    FakeBackendProvider,
    RouteService,
    CitiesProvider,
    DataProviderService,
    SpinnerProvider,
    MessagingService,
    SubscriptionService,
    RatingProvider,
    { provide: APP_INITIALIZER, useFactory: citiesProviderFactory, deps: [CitiesProvider], multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pl' },
  ],
  entryComponents: [SpinnerComponent, RatingComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
  }
}
