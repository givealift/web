import { Component, ViewChild, OnInit } from '@angular/core';

import { UserService, User } from '../../services/user.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit{
  photo;
  sanitizedPhoto;

  @ViewChild('fileInput') fileInput;

  constructor(private userService: UserService, private sanitizer: DomSanitizer ) {}

  ngOnInit() {
    this.userService.getPhoto(1)
      .subscribe(photo => {
          this.photo = photo;
          let urlCreator = window.URL;
          this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(this.photo));
        }
      )
  }




  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      this.sanitizedPhoto = fileBrowser.file[0];
      formData.append("file", fileBrowser.files[0]);
      this.userService.upload(formData, 1).subscribe(res => {

      });
    }
  }


}
