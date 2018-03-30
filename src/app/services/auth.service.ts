import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    testLogin = 'test';
    testPassword = 'pass';

    login(userModel: any) {
        if (this.testLogin == userModel.username && this.testPassword == userModel.password) {
            console.log("Logged in!");
            localStorage.setItem('currentUser', 'testUser');
            return true;
        }
        else {
            return false;
        }
    }

    logout(userModel: any) {
        console.log("Logged out!")
        localStorage.removeItem('currentUser');
    }
}