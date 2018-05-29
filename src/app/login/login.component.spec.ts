import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {AuthService} from '../_services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../_modules/material.module';
import {UserService} from '../_services/user.service';
import {DataProviderService} from '../_services/data-provider.service';
import {MatSnackBarModule} from "@angular/material";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        MaterialModule,
        MatSnackBarModule
      ],
      providers: [
        AuthService,
        UserService,
        DataProviderService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
