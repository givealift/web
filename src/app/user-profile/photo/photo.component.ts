import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  photo;
  sanitizedPhoto;
  @Input()
  edit: boolean = false;
  userId: number = parseInt(localStorage.getItem("id"));

  @ViewChild('fileInput') fileInput;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.userService.getPhoto(parseInt(localStorage.getItem("id")))
      .subscribe(photo => {
        this.photo = photo;
        let urlCreator = window.URL;
        this.sanitizedPhoto = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(this.photo));
      }
      )
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
