import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { UserInfoComponent } from "./user-profile/user-info/user_info.component";
import { UserProfileComponent } from "./user-profile/user_profile.component";
import { AuthGuard } from "./_services/auth-guard.service";
import { NewRouteComponent } from "./route/new-route/new-route.component";
import { RouteListComponent } from "./route/route-list/route-list.component";
import { FavouriteRoutesComponent } from "./route/favourite-routes/favourite-routes.component";
import {RouteDetailsComponent} from "./route/route-details/route-details.component";
import {RouteService} from "./_services/route.service";

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-route', component: NewRouteComponent, canActivate: [AuthGuard] },
  { path: 'route-list', component: RouteListComponent },
  { path: 'user/:id', component: UserInfoComponent },
  {
    path: 'profile', component: UserProfileComponent, children: [
      { path: 'info', component: UserInfoComponent },
      { path: 'routes', component: UserRideComponent },
      { path: 'favourite-routes', component: FavouriteRoutesComponent }
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
