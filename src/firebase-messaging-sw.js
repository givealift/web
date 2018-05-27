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

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  var notificationTitle = `Nowy przejazd na trasie ${payload.data.fromCityName} - ${payload.data.toCityName}`;
  var notificationOptions = {
    body: 'Pojawił się nowy przejazd na trasie którą obserwujesz. \nKliknij po szczegóły.'
  };

  self.addEventListener('notificationclick', function (event) {
    const clickedNotification = event.notification;
    clickedNotification.close();
    const detailsPage = `https://givealift.herokuapp.com/route/${payload.data.routeId}`;

    const promiseChain = clients.openWindow(detailsPage);
    event.waitUntil(promiseChain);
  });

  return self.registration.showNotification(notificationTitle, notificationOptions);
});