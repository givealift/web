export class AuthService {

    testLogin = 'test';
    testPassword = 'pass';

    loggedIn = false;

    isAuthenticated(){
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout( () => {
                    resolve(this.loggedIn)
                }, 800);
            });
            return promise;
    }

    login(username: string, password: string) {
        if(this.testLogin == username && this.testPassword == password){
            console.log("logging in: " + username + " " + password);
            return true;
        }
        else {
            return false;
        }
    }

    logout(username: string, password: string){
        this.loggedIn = false;
        return true;
    }
}