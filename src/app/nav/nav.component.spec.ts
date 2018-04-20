import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material.module';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        HttpClientModule, RouterTestingModule,
        MaterialModule
      ],
      providers: [
        AuthService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
