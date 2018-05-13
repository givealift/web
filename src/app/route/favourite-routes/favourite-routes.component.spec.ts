import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteRoutesComponent } from './favourite-routes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../_services/user.service';
import { DataProviderService } from '../../_services/data-provider.service';
import { MaterialModule } from '../../_modules/material.module';
import { RouteListComponent } from '../route-list/route-list.component';
import { Route } from '../../_models';
import { RouteComponent } from '../route/route.component';
import { RouteService } from '../../_services/route.service';
import { HttpClientModule } from '@angular/common/http';

describe('FavouriteRoutesComponent', () => {
  let component: FavouriteRoutesComponent;
  let fixture: ComponentFixture<FavouriteRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FavouriteRoutesComponent,
        RouteListComponent,
        RouteComponent
      ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        HttpClientModule
      ],
      providers: [
        UserService,
        DataProviderService,
        RouteService
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
