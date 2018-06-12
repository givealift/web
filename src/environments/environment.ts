// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiUrl: "http://localhost:8080/api"
  apiUrl: "https://cors-anywhere.herokuapp.com/https://mysterious-lowlands-82501.herokuapp.com/api",
  firebase: {
    apiKey: "AIzaSyBjvfabjohOaAQupLkBSkhVH5MTZl2IzXc",
    authDomain: "messaging-givealift.firebaseapp.com",
    databaseURL: "https://messaging-givealift.firebaseio.com",
    projectId: "messaging-givealift",
    storageBucket: "messaging-givealift.appspot.com",
    messagingSenderId: "442298684003"
  }
};
