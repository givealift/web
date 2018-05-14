import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { UserInfoComponent } from "./user-profile/user-info/user-info.component";
import { UserProfileComponent } from "./user-profile/user_profile.component";
import { AuthGuard } from "./_services/auth-guard.service";
import { NewRouteComponent } from "./route/new-route/new-route.component";
import { RouteListComponent } from "./route/route-list/route-list.component";
import { UserRouteComponent } from "./user-profile/user-route/user-route.component";
import { UserEditFormComponent } from "./user-profile/user-edit-form/user-edit-form.component";

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-route', component: NewRouteComponent, canActivate: [AuthGuard] },
  { path: 'route-list', component: RouteListComponent },
  { path: 'user/:id', component: UserInfoComponent },
  {
    path: 'profile', component: UserProfileComponent, children: [
      { path: 'edit', component: UserEditFormComponent },
      { path: 'routes', component: UserRouteComponent },
    ]
  },
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
