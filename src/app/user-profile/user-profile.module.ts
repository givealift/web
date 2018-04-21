import { PhotoComponent } from "./photo/photo.component";
import { NgModule } from "@angular/core";

import { UserRideComponent } from "./user-ride/user_ride.component";
import { UserProfileComponent } from "./user_profile.component";
import { UserInfoComponent } from "./user-info/user_info.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";
import { UserProfileRouting } from "./user-profile.routing";
import { RideComponent } from "../ride-list/ride/ride.component";

@NgModule({
  imports: [UserProfileRouting, FormsModule, BrowserModule,
    AppRoutingModule,
    HttpClientModule],
  exports: [PhotoComponent],
  declarations: [
    UserInfoComponent,
    UserProfileComponent,
    PhotoComponent,
    UserRideComponent
  ],
  providers: [],
})

export class UserProfileModule {
}
