import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { MaterialModule } from '../../_modules/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../_services/user.service';
import { FormsModule } from '@angular/forms';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserEditComponent,
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
