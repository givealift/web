import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubscriptionsComponent } from './user-subscriptions.component';
import { SubscriptionComponent } from '../../subscription/subscription/subscription.component';
import { MaterialModule } from '../../_modules/material.module';

describe('UserSubscriptionsComponent', () => {
  let component: UserSubscriptionsComponent;
  let fixture: ComponentFixture<UserSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserSubscriptionsComponent,
        SubscriptionComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
