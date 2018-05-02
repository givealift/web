import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteListComponent } from './route-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../_modules/material.module';
import { RouteComponent } from '../route/route.component';
import { RouteService } from '../../_services/route.service';
import { CityService } from '../../_services/city.service';
import { CitiesProvider } from '../../_providers/cities-provider';

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RouteListComponent, RouteComponent],
      imports: [MaterialModule, HttpClientModule],
      providers: [RouteService, CityService, CitiesProvider]
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
