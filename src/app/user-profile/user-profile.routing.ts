import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PhotoComponent} from "./photo/photo.component";
import {UserRideComponent} from "./user-ride/user_ride.component";
import {AuthGuard} from "../services/auth-guard.service";
import {UserInfoComponent} from "./user-info/user_info.component";
import {UserProfileComponent} from "./user_profile.component";



const routes: Routes = [{
  path: '',
  component: UserProfileComponent,
  children: [{
    path: 'info',
    component: UserInfoComponent
  },
  {
    path: 'ride',
    component: UserRideComponent
  }


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRouting { }

export const routedComponents = [
 UserProfileComponent,UserInfoComponent,
  PhotoComponent,UserRideComponent
];
