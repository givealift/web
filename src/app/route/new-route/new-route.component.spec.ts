import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRouteComponent } from './new-route.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { RouteService } from '../../_services/route.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../_modules/material.module';
import { CityService } from '../../_services/city.service';
import { CitiesProvider } from '../../_providers/cities-provider';

describe('NewRouteComponent', () => {
  let component: NewRouteComponent;
  let fixture: ComponentFixture<NewRouteComponent>;


  beforeAll(() => {
    let currentUser = {
      "firstName": "Jan",
      "lastName": "wazingaaa",
      "login": "qwe",
      "email": "qwe@mail.com",
      "id": 1,
      "token": "fake-token"
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewRouteComponent],
      imports: [FormsModule,
        RouterTestingModule,
        HttpClientModule,
        MaterialModule],
      providers: [RouteService, CityService, CitiesProvider]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
