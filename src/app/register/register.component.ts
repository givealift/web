import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel: any = {};

  @ViewChild('form') registerForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authService.isAuthenticated()) {
      this.router.navigate([returnUrl]);
    }
  }

  onSubmit() {
    this.userService.create(this.userModel).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['']);
      },
      error => {
        //always throws an error, so for testing
        this.router.navigate(['']);
      }
    )

  }

}
