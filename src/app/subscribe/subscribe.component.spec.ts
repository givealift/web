import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeComponent } from './subscribe.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../_modules/material.module';
import { SubscriptionService } from '../_services/subscription.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { DataProviderService } from '../_services/data-provider.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SubscribeComponent', () => {
  let component: SubscribeComponent;
  let fixture: ComponentFixture<SubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribeComponent],
      imports: [
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        SubscriptionService,
        AuthService,
        UserService,
        DataProviderService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
