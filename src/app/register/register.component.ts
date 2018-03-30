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

  @ViewChild('form') registerForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authService.isAuthenticated()) {
      this.router.navigate([returnUrl]);
    }
  }

  onSubmit() {
    this.userService.create(this.userModel).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        //always throws an error, so for testing
        this.router.navigate(['']);
      }
    )

  }

}
