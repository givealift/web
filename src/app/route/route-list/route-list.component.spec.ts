import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteListComponent } from './route-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../_modules/material.module';
import { RouteComponent } from '../route/route.component';
import { DataProviderService } from '../../_services/data-provider.service';
import { RouteService } from '../../_services/route.service';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../../_services/city.service';
import { CitiesProvider } from '../../_providers/cities-provider';
import { of } from 'rxjs/observable/of';

const fakeActivatedRoute = {
  snapshot: { data: {} },
  queryParams: of({})
}

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
        MaterialModule
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
    fixture = TestBed.createComponent(RouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
