import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideComponent } from './ride.component';
import { Ride } from '../../services/ride.service';
import { MaterialModule } from '../../modules/material.module';

describe('RideComponent', () => {
  let component: RideComponent;
  let fixture: ComponentFixture<RideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RideComponent],
      imports: [MaterialModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
