import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../_models";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {

  @Input() 
  user: User = new User();

  tmpModel: any = {};
  
  userId: number = parseInt(localStorage.getItem("id"));
  @Output() userChange: EventEmitter<User>;


  constructor(private userService: UserService) {
    this.userChange = new EventEmitter<User>();
  }

  ngOnInit() {
  }

  updateUser() {
    this.userChange.emit(this.user);
    console.log(this.user);
    this.userService.update(this.user, this.userId).subscribe(
      () => {
      },
      error => {
        console.log(error);
      }
    );
  }
}
