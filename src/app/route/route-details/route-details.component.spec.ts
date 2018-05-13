import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDetailsComponent } from './route-details.component';
import { RouteComponent } from '../route/route.component';
import { RouteListComponent } from '../route-list/route-list.component';
import { MaterialModule } from '../../_modules/material.module';
import { RouteService } from '../../_services/route.service';
import { HttpClientModule } from '@angular/common/http';
import { CityService } from '../../_services/city.service';
import { CitiesProvider } from '../../_providers/cities-provider';
import { RouterTestingModule } from '@angular/router/testing';
import { DataProviderService } from '../../_services/data-provider.service';

describe('RouteDetailsComponent', () => {
  let component: RouteDetailsComponent;
  let fixture: ComponentFixture<RouteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouteDetailsComponent,
        RouteComponent, //to remove
        RouteListComponent //to remove
      ],
      imports: [
        MaterialModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        RouteService,
        CityService,
        CitiesProvider,
        DataProviderService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
