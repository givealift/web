import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./services/auth-guard.service";
import { NewRideComponent } from "./new-ride/new-ride.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add', component: NewRideComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'new-ride', component: NewRideComponent, canActivate: [AuthGuard] },


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
