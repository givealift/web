import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel: User = new User();
  passConfirm: string;
  showSpinner = false;

  returnUrl: string;

  @ViewChild('form') registerForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit() {
    this.showSpinner = true;
    this.userService.create(this.userModel).subscribe(
      () => {
        localStorage.setItem("currentUser", JSON.stringify(this.userModel));
        this.authService.loggedInStatus.emit(true);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.router.navigate(['/login']);
      }
    )

  }

}
