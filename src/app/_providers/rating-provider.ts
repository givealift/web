import { MatDialogRef, MatDialog } from "@angular/material";
import { RatingComponent } from "../rating/rating.component";
import { Injectable } from "@angular/core";

@Injectable()
export class RatingProvider {
    private dialogRef: MatDialogRef<RatingComponent>

    constructor(public dialog: MatDialog) {
    }

    open(photo: any, user: any) {
        this.dialogRef = this.dialog.open(RatingComponent, {
            panelClass: 'rating',
            data: {
                userPhoto: photo,
                userData: user
            }
        });
    }

    close() {
        this.dialogRef.close();
    }
}