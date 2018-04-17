import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CitySearchComponent } from '../city-search/city-search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Give-a-lift';
  loggedIn: boolean = this.authService.isAuthenticated();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loggedInStatus.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

}
