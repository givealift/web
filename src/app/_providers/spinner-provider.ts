import { Injectable, APP_INITIALIZER } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { SpinnerComponent } from "../spinner/spinner.component";

@Injectable()
export class SpinnerProvider {

    private dialogRef: MatDialogRef<SpinnerComponent>


    constructor(public dialog: MatDialog) {
    }

    open() {
        this.dialogRef = this.dialog.open(SpinnerComponent, {
            panelClass: 'spinner'
        });
    }

    close() {
        this.dialogRef.close();
    }

}