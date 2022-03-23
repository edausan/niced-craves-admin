importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js'
);
// importScripts("https://www.gstatic.com/firebasejs/init.js")
// importScripts("/__/firebase/9.2.0/firebase-app-compat.js")
// importScripts("/__/firebase/9.2.0/firebase-messaging-compat.js")
// importScripts("/__/firebase/init.js")

const config = {
  apiKey: 'AIzaSyD5D_95e3pq02ZPhcpYrSKR635tuSsSW3w',
  authDomain: 'niced-craves-ordering-system.firebaseapp.com',
  projectId: 'niced-craves-ordering-system',
  storageBucket: 'niced-craves-ordering-system.appspot.com',
  messagingSenderId: '312614147462',
  appId: '1:312614147462:web:b52fa416f8d60d3079c807',
  measurementId: 'G-83NHNTTGXS',
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
