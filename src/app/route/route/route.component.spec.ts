import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteComponent } from './route.component';
import { Route } from '../../_models';
import { MaterialModule } from '../../_modules/material.module';
import { UserService } from '../../_services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DataProviderService } from '../../_services/data-provider.service';

describe('RouteComponent', () => {
  let component: RouteComponent;
  let fixture: ComponentFixture<RouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouteComponent
      ],
      imports: [
        MaterialModule, 
        HttpClientModule
      ],
      providers: [
        UserService,
        DataProviderService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
