import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./_services/auth-guard.service";
import { NewRouteComponent } from "./route/new-route/new-route.component";
import { RouteListComponent } from "./route/route-list/route-list.component";

const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add', component: NewRouteComponent, canActivate: [AuthGuard] },
    { path: 'new-route', component: NewRouteComponent, canActivate: [AuthGuard] },
    { path: 'route-list', component: RouteListComponent },

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
