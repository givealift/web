import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule
    , MatToolbarModule
    , MatMenuModule
    , MatIconModule
    , MatInputModule
    , MatProgressSpinnerModule
    , MatCardModule
    , MatDatepickerModule
    , MatListModule
    , MatRadioModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from "@angular/material-moment-adapter";


@NgModule({
    imports: [
        BrowserAnimationsModule
        , MatButtonModule
        , MatToolbarModule
        , MatMenuModule
        , MatIconModule
        , MatInputModule
        , MatProgressSpinnerModule
        , MatCardModule
        , MatDatepickerModule
        , MatMomentDateModule
        , MatListModule
        , MatRadioModule
    ],
    exports: [
        BrowserAnimationsModule
        , MatButtonModule
        , MatToolbarModule
        , MatMenuModule
        , MatIconModule
        , MatInputModule
        , MatProgressSpinnerModule
        , MatCardModule
        , MatDatepickerModule
        , MatMomentDateModule
        , MatListModule
        , MatRadioModule
    ],
})
export class MaterialModule { }