import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteListComponent } from './route-list.component';
import { MaterialModule } from '../../_modules/material.module';
import { RouteComponent } from '../route/route.component';


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
        MaterialModule,
      ],
      providers: [
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
