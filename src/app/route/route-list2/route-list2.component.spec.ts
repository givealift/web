import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteList2Component } from './route-list2.component';

describe('RouteList2Component', () => {
  let component: RouteList2Component;
  let fixture: ComponentFixture<RouteList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
