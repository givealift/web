importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyBjvfabjohOaAQupLkBSkhVH5MTZl2IzXc",
  authDomain: "messaging-givealift.firebaseapp.com",
  databaseURL: "https://messaging-givealift.firebaseio.com",
  projectId: "messaging-givealift",
  storageBucket: "messaging-givealift.appspot.com",
  messagingSenderId: "442298684003"
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