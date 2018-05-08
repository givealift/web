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
    , MatTabsModule
    , MatFormFieldModule
    , MatOptionModule
    , MatAutocompleteModule
    , MatTooltipModule
    , MatTooltip
    , MatIconRegistry
    , MatRadioModule
    , MatGridListModule
    , MatExpansionModule,
    MatStepperModule
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
        , MatTabsModule
        , MatRadioModule
        , MatGridListModule
        , MatExpansionModule
        , MatFormFieldModule
        , MatOptionModule
        , MatAutocompleteModule
        , MatTooltipModule
        , MatStepperModule
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
        , MatTabsModule
        , MatRadioModule
        , MatGridListModule
        , MatExpansionModule
        , MatFormFieldModule
        , MatOptionModule
        , MatAutocompleteModule
        , MatTooltipModule
        , MatStepperModule
    ],
})
export class MaterialModule { }