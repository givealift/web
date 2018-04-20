import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserInfoComponent, UserProfileComponent} from "./user-info/user_info.component";
import {PhotoComponent} from "./photo/photo.component";
import {UserRideComponent} from "./user-ride/user_ride.component";
import {AuthGuard} from "../services/auth-guard.service";



const routes: Routes = [{
  path: '',
  component: UserInfoComponent,
  children: [{
    path: '/info',
    component: UserInfoComponent,canActivate: [AuthGuard]
  },
  {
    path: '/rides',
    component: UserRideComponent,canActivate: [AuthGuard]
  }


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
 UserProfileComponent,
  PhotoComponent
];
