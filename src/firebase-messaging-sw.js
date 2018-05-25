importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyA6Gd49Bkg6px2EZO3hukDJuSKYbQD9fTg",
  authDomain: "givealift-messaging.firebaseapp.com",
  databaseURL: "https://givealift-messaging.firebaseio.com",
  projectId: "givealift-messaging",
  storageBucket: "givealift-messaging.appspot.com",
  messagingSenderId: "679680639018"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
