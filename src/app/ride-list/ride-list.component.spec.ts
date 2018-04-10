import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideListComponent } from './ride-list.component';
import { RideComponent } from './ride/ride.component';
import { HttpClientModule } from '@angular/common/http';

describe('RideListComponent', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RideListComponent, RideComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});