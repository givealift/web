import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteListComponent } from './route-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../_modules/material.module';
import { RouteComponent } from '../route/route.component';
import { DataProviderService } from '../../_services/data-provider.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouteListComponent,
        RouteComponent
      ],
      imports: [
        HttpClientModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [DataProviderService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
