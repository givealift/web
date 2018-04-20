import {PhotoComponent} from "./photo/photo.component";
import {NgModule} from "@angular/core";
import {UserProfileComponent} from "./user-info/user_info.component";
import {UserRideComponent} from "./user-ride/user_ride.component";

@NgModule({
  imports: [],
  exports: [PhotoComponent],
  declarations: [
    UserProfileComponent,
    PhotoComponent,
    UserRideComponent
    ],
  providers: [],
})

export class UserProfileModule {
}
