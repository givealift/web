import { PhotoComponent } from "./photo/photo.component";
import { NgModule } from "@angular/core";

import { UserRideComponent } from "./user-ride/user_ride.component";
import { UserProfileComponent } from "./user_profile.component";
import { UserInfoComponent } from "./user-info/user_info.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";
import { RideComponent } from "../ride-list/ride/ride.component";
import { RideModule } from "../ride-list/ride/ride.module";
import { MaterialModule } from "../material.module";

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RideModule,
    MaterialModule],
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
