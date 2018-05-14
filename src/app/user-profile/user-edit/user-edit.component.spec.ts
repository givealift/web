import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { MaterialModule } from '../../_modules/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../_services/user.service';
import { FormsModule } from '@angular/forms';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserEditFormComponent } from '../user-edit-form/user-edit-form.component';
import { PhotoComponent } from '../photo/photo.component';
import { DataProviderService } from '../../_services/data-provider.service';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserEditComponent,
        UserInfoComponent,
        UserEditFormComponent,
        PhotoComponent
      ],
      imports: [
        MaterialModule,
        RouterTestingModule,
        HttpClientModule,
        FormsModule
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
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
