import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user_profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../_modules/material.module';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { DataProviderService } from '../_services/data-provider.service';


describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserProfileComponent
            ],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                MaterialModule
            ],
            providers: [
                AuthService,
                UserService,
                DataProviderService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
