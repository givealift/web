export class AuthService {

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
        this.loggedIn = true;
        console.log("logging in: " + username + " " + password);
        return true;
    }

    logout(username: string, password: string){
        this.loggedIn = false;
        return true;
    }
}