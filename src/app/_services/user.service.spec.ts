import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from "./user.service";
import { DataProviderService } from "./data-provider.service";


describe("UserService", () => {

    const mockedData = {
        "firstName": "jan",
        "lastName": "brzechwa",
        "email": "jan@brzechwa",
        "phone": "123456",
        "gender": "male",
        "birthYear": null,
        "address": null,
        "rate": null
    };

    let userService: UserService;
    let httpMock: HttpTestingController;
    let dataProvider: DataProviderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserService,
                DataProviderService
            ],
            imports: [
                HttpClientTestingModule
            ]
        });

        httpMock = TestBed.get(HttpTestingController);
        userService = TestBed.get(UserService);
        dataProvider = TestBed.get(DataProviderService);
    })

    afterEach(() => {
        httpMock.verify();
    });

    it("#getById() should return user if it exists", () => {
        const userId = 212;
        userService.getById(userId).subscribe(user => {
            expect(user).toBeDefined();
            expect(user.firstName).toEqual(mockedData.firstName);
        })

        const req = httpMock.expectOne(
            req => req.url.includes(`/user/public/${userId}`)
        );
        req.flush(mockedData);
    })

    it("#getById() should return null if user doesn't exist", () => {
        const userId = 0;
        userService.getById(userId).subscribe(user => {
            expect(user).toEqual(null);
        })
        const req = httpMock.expectOne(
            req => req.url.includes(`/user/public/${userId}`)
        );
        req.flush("no content", { status: 204, statusText: "no content" });
    })

    it("#getById() should not make http call if user is in dataService", () => {
        const userId = 212;
        dataProvider.storeData(`user/${userId}`, mockedData);
        userService.getById(userId).subscribe(user => {
            expect(user).toBeDefined();
            expect(user.firstName).toEqual(mockedData.firstName);
        })
        const req = httpMock.expectNone(
            req => req.url.includes(`/user/${userId}`)
        );
    })
})