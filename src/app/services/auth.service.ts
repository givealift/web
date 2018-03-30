import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    @Output() loggedInStatus: EventEmitter<boolean> = new EventEmitter();

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
    }

    isAuthenticated(): boolean {
        // TODO: check if valid jwt (?) token & non expired
        const user = JSON.parse(localStorage.getItem("currentUser")) as User;
        return user !== null && user.token !== null;
    }
}