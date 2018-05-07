// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { UserEditFormComponent } from './user-edit-form.component';
// import { MaterialModule } from '../../_modules/material.module';
// import { FormsModule } from '@angular/forms';
// import { PhotoComponent } from '../photo/photo.component';
// import { UserService } from '../../_services/user.service';
// import { HttpClientModule } from '@angular/common/http';
// import { Component, ViewChild } from '@angular/core';

// describe('UserEditFormComponent', () => {
//   let hostComponent: TestHostComponent;
//   let fixture: ComponentFixture<TestHostComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         TestHostComponent,
//         UserEditFormComponent,
//         PhotoComponent
//       ],
//       imports: [
//         MaterialModule,
//         FormsModule,
//         HttpClientModule
//       ],
//       providers: [
//         UserService
//       ]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestHostComponent);
//     hostComponent = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(hostComponent).toBeTruthy();
//   });
//   @Component({
//     selector: `host-component`,
//     template: `<app-user-edit-form [user]='testUser'></app-user-edit-form>`
//   })
//   class TestHostComponent {

//     testUser = {
//       id: 1,
//       gender: "male",
//       firstName: "test",
//       lastName: "test",
//       login: "test",
//       password: "test",
//       email: "test",
//       token: "test",
//       phone: "test"
//     }

//     @ViewChild(UserEditFormComponent)
//     public componentUnderTestComponent: UserEditFormComponent;
//   }

// });