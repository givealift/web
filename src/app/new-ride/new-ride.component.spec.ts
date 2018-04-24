import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRideComponent } from './new-ride.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { RideService } from '../services/ride.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../modules/material.module';

describe('NewRideComponent', () => {
  let component: NewRideComponent;
  let fixture: ComponentFixture<NewRideComponent>;


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
      declarations: [NewRideComponent],
      imports: [FormsModule,
        RouterTestingModule,
        HttpClientModule,
        MaterialModule],
      providers: [RideService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
