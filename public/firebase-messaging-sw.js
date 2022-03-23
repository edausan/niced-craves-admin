importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore-compat.js'
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
  appId: '1:312614147462:web:31c8a827a9b4600f79c807',
  measurementId: 'G-KBG9XZMELD',
};

firebase.initializeApp(config);
const db = firebase.firestore();

const messaging = firebase.messaging();

db.collection('orders')
  .orderBy('date_created', 'desc')
  .limit(1)
  .onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const order = doc.data();
      const notificationTitle = `NEW ORDER from ${order.customer.name}`;
      const notificationOptions = {
        body: order.cart[0].name,
        icon: 'https://firebasestorage.googleapis.com/v0/b/niced-craves-ordering-system.appspot.com/o/small_niced_craves_logo.png?alt=media&token=180672f3-f1f5-40c7-bd69-7f78d1f11e5a',
        image: order.cart[0].thumb,
      };
      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
  });

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
