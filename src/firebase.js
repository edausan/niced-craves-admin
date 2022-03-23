import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

export const FIREBASE_MESSAGING_TOKEN =
  'BCBU68xcxNjvAE2As32ZTMa1k4Nf3X6Uw0bU-Tup3PubkPqHHY-kAXtYxNZTYPmVZnjnxWjckYczQJsWwRuSZLg';

export const CONFIG = {
  apiKey: 'AIzaSyD5D_95e3pq02ZPhcpYrSKR635tuSsSW3w',
  authDomain: 'niced-craves-ordering-system.firebaseapp.com',
  projectId: 'niced-craves-ordering-system',
  storageBucket: 'niced-craves-ordering-system.appspot.com',
  messagingSenderId: '312614147462',
  appId: '1:312614147462:web:31c8a827a9b4600f79c807',
  measurementId: 'G-KBG9XZMELD',
};

export const app = initializeApp(CONFIG);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

export const GetToken = async (setTokenFound) => {
  let currentToken = '';

  try {
    currentToken = await getToken(messaging, {
      vapidKey: FIREBASE_MESSAGING_TOKEN,
    });
    // console.log({ currentToken });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
    return currentToken;
  } catch (error) {
    console.log({ error });
  }
};

export const onMessageListener = async () => {
  onMessage(messaging, (next) => {
    next.notification.body();
    console.log({ notif: next.notification });
    //   return payload;
  });
  try {
  } catch (error) {
    console.log({ onMessageListenerError: error });
  }
  //   new Promise((resolve) => {
  //     onMessage(messaging, (payload) => {
  //       console.log({ payload });
  //       resolve(payload);
  //     });
};

onMessageListener();
