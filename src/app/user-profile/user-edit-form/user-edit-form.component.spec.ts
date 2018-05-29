import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserEditFormComponent} from './user-edit-form.component';
import {MaterialModule} from '../../_modules/material.module';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {DataProviderService} from '../../_services/data-provider.service';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from "@angular/material";

describe('UserEditFormComponent', () => {
  let hostComponent: UserEditFormComponent;
  let fixture: ComponentFixture<UserEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserEditFormComponent
      ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [
        UserService,
        DataProviderService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditFormComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

});
