import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {UserInfoComponent} from "./user-profile/user-info/user-info.component";
import {AuthGuard} from "./_services/auth-guard.service";
import {NewRouteComponent} from "./route/new-route/new-route.component";
import {RouteListComponent} from "./route/route-list/route-list.component";
import {UserRouteComponent} from "./user-profile/user-route/user-route.component";
import {UserEditFormComponent} from "./user-profile/user-edit-form/user-edit-form.component";

<<<<<<< HEAD
import { FavouriteRoutesComponent } from "./user-profile/favourite-routes/favourite-routes.component";
import { RouteDetailsComponent } from "./route/route-details/route-details.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import {SubscriptionsListComponent} from "./user-profile/subscriptions-list/subscriptions-list.component";
=======
import {FavouriteRoutesComponent} from "./user-profile/favourite-routes/favourite-routes.component";
import {RouteDetailsComponent} from "./route/route-details/route-details.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
>>>>>>> 652d71bfbd2a3c7be951c136c7d7f48f06466707

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-route', component: NewRouteComponent, canActivate: [AuthGuard] },
  { path: 'route-list', component: RouteListComponent },
  { path: 'user/:id', component: UserInfoComponent },
  {path: 'change-password', component: ChangePasswordComponent},
  {
    path: 'profile', component: UserProfileComponent, children: [
      { path: 'info', component: UserInfoComponent },
      { path: 'edit', component: UserEditFormComponent },
      { path: 'routes', component: UserRouteComponent },
      { path: 'fav-routes', component: FavouriteRoutesComponent },
      { path: 'subs-list', component: SubscriptionsListComponent }
    ]
  },
  { path: 'route/:routeId', component: RouteDetailsComponent },
  { path: '**', redirectTo: '' }
];

/**
 * Module responsible for routing across the app
 */

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
