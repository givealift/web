import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../_models";
import {UserService} from "../../_services/user.service";
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  sanitizedPhoto;

  userModel: User = new User();
  userCopyModel: User = new User();

  today: Date = new Date();

  passConfirm: string;
  config = new MatSnackBarConfig();
  optionalInfo: any = {};

  userId: number = parseInt(localStorage.getItem("id"));
  oldPass: string = "";
  newPass: string = "";

  constructor(private userService: UserService, private router: Router, private sanitizer: DomSanitizer, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userService.getById(this.userId).subscribe(user => {
      if (user) {
        this.userModel = user;
        console.log(user);
        this.userService.getPhoto(this.userId)
          .subscribe(photo => {
            let urlCreator = window.URL;
            this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(photo));
          })
      }
      else
        this.router.navigate[''];
    });
    this.config.extraClasses = ['gal-snack'];
    this.config.duration = 500;
  }

  updateUser() {
    console.log(this.userModel);

    if (this.userModel.password == null)
      delete this.userModel.password;

    this.userService.update(this.userModel, this.userId).subscribe(
      response => {
        console.log(response);
        console.log("success");
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.sanitizedPhoto = event.target.result;
      };
    }
  }

  changePassword() {
    this.userService.changePassword(this.oldPass, this.newPass)
      .subscribe(data => this.snackBar.open('Hasło zmienione', "", this.config),
        error => {
          if (error.status == 401) {
            this.snackBar.open("Błędne hasło", "", this.config);
          } else
            this.snackBar.open('OOOOPS coś poszło nie tak', "", this.config);
        });
  }

  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      //  let urlCreator = window.URL;
      this.sanitizedPhoto = fileBrowser.files[0];
      formData.append("file", fileBrowser.files[0]);
      this.userService.upload(formData, this.userId).subscribe(res => {
      });
    }
  }
}
