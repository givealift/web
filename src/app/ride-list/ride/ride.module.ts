
import { NgModule } from "@angular/core";


import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../../app-routing.module";
import { RideComponent } from "./ride.component";
import { MaterialModule } from "../../material.module";

@NgModule({
    imports: [FormsModule, BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule],
    exports: [RideComponent],
    declarations: [
        RideComponent
    ],
    providers: [],
})

export class RideModule {
}