import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../_modules/material.module';
import { RouteComponent } from '../route/route.component';
import { DataProviderService } from '../../_services/data-provider.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteService } from '../../_services/route.service';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../../_services/city.service';
import { CitiesProvider } from '../../_providers/cities-provider';
import { of } from 'rxjs/observable/of';
import { RouteSearchComponent } from './route-search.component';
import { RouteListComponent } from '../route-list/route-list.component';

const fakeActivatedRoute = {
  snapshot: { data: {} },
  queryParams: of({})
}

describe('RouteSearchComponent', () => {
  let component: RouteSearchComponent;
  let fixture: ComponentFixture<RouteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouteSearchComponent,
        RouteListComponent,
        RouteComponent
      ],
      imports: [
        HttpClientModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        DataProviderService,
        RouteService,
        CityService,
        CitiesProvider,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
