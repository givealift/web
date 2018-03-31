import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  constructor(
    private userService: UserService, private router: Router, private authService: AuthService) {
    this.user = <User>JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
  }

  delete() {
    this.userService.delete(this.user.id)
      .subscribe(() => {
        console.log("user deleted");
        localStorage.removeItem("currentUser");
        this.authService.loggedInStatus.emit(false);
        this.router.navigate(['']);
      })
  }

  edit() {
    let modifiedUser = { ...this.user };
    modifiedUser.lastName = "wazingaaa";
    
    this.userService.update(modifiedUser)
      .subscribe(response => {
        let updatedUser = Object.assign({}, this.user, modifiedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }, err => console.log(err))
  }

}
