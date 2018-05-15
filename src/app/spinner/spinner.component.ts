import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SpinnerComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

}
