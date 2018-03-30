export class AuthService {

    testLogin = 'test';
    testPassword = 'pass';

    login(username: string, password: string) {
        if(this.testLogin == username && this.testPassword == password){
            console.log("Logged in!");
            localStorage.setItem('currentUser', 'testUser');
            return true;
        }
        else {
            return false;
        }
    }

    logout(username: string, password: string){
        console.log("Logged out!")
        localStorage.removeItem('currentUser');
    }
}