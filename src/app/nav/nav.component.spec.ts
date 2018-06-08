import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { AuthService } from '../_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../_services/user.service';
import { MaterialModule } from '../_modules/material.module';
import { DataProviderService } from '../_services/data-provider.service';
import { NotificationComponent } from '../notification/notification.component';
import { Title } from '@angular/platform-browser';
import { MessagingService } from '../_services/messaging.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavComponent,
        NotificationComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [
        AuthService,
        UserService,
        DataProviderService,
        Title,
        MessagingService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
