import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../_modules/material.module';
import { RouteListComponent } from '../../route/route-list/route-list.component';
import { RouteComponent } from '../../route/route/route.component';
import { RouteService } from '../../_services/route.service';
import { CitySearchComponent } from '../../city-search/city-search.component';
import { CityService } from '../../_services/city.service';
import { CitiesProvider } from '../../_providers/cities-provider';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { UserInfoComponent } from './user_info.component';
import { PhotoComponent } from '../photo/photo.component';
import { DataProviderService } from '../../_services/data-provider.service';


describe('UserInfoComponent', () => {
    let component: UserInfoComponent;
    let fixture: ComponentFixture<UserInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserInfoComponent,
                PhotoComponent
            ],
            imports: [
                MaterialModule,
                RouterTestingModule,
                HttpClientModule,
                MaterialModule
            ],
            providers: [
                UserService,
                DataProviderService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
