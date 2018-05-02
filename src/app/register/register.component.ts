import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from "../_models";
import { AuthService } from '../_services/auth.service';

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
      id => {
        localStorage.setItem("id", id.toLocaleString());
       this.router.navigate(['/login']);
      },
      error => {
        this.showSpinner = false;
        this.router.navigate(['/login']);
      }
    )

  }

}
