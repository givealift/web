// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiUrl: "http://localhost:8080/api"
  apiUrl: "https://cors-anywhere.herokuapp.com/https://mysterious-lowlands-82501.herokuapp.com/api",
  firebase: {
    apiKey: "AIzaSyA6Gd49Bkg6px2EZO3hukDJuSKYbQD9fTg",
    authDomain: "givealift-messaging.firebaseapp.com",
    databaseURL: "https://givealift-messaging.firebaseio.com",
    projectId: "givealift-messaging",
    storageBucket: "givealift-messaging.appspot.com",
    messagingSenderId: "679680639018"
  }
};
