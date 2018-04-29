import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthService } from '../_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../_modules/material.module';
import { CitySearchComponent } from '../city-search/city-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CityService } from '../_services/city.service';
import { RouteService } from '../_services/route.service';
import { CitiesProvider } from '../_providers/cities-provider';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent, CitySearchComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthService,
        UserService,
        CityService,
        RouteService,
        CitiesProvider
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
