import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CitySearchComponent } from '../city-search/city-search.component';
import { CityService } from '../services/city.service';
import { RideListComponent } from '../ride-list/ride-list.component';
import { FormsModule } from '@angular/forms';
import { RideComponent } from '../ride-list/ride/ride.component';
import { RideService } from '../services/ride.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        CitySearchComponent,
        RideListComponent,
        RideComponent
      ],
      imports: [
        HttpClientModule, RouterTestingModule,
        FormsModule
      ],
      providers: [
        AuthService, UserService, CityService, RideService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Give-a-lift'`, async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Give-a-lift');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Witaj w Give-a-lift!');
  }));

});
