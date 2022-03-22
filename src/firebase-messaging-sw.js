importScripts("https://wwww.gstatic.com/firebasefj/9.6.9/firebase-app.js")
importScripts("https://wwww.gstatic.com/firebasefj/9.6.9/firebase-messagin.js")
// importScripts("/__/firebase/9.2.0/firebase-messaging-compat.js")
// importScripts("/__/firebase/init.js")

const firebaseConfig = {
	apiKey: "AIzaSyD5D_95e3pq02ZPhcpYrSKR635tuSsSW3w",
	authDomain: "niced-craves-ordering-system.firebaseapp.com",
	projectId: "niced-craves-ordering-system",
	storageBucket: "niced-craves-ordering-system.appspot.com",
	messagingSenderId: "312614147462",
	appId: "1:312614147462:web:31c8a827a9b4600f79c807",
	measurementId: "G-KBG9XZMELD"
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
	console.log("[firebase-messaging-sw.js] Received background message ", payload)
	// Customize notification here
	const notificationTitle = "Background Message Title"
	const notificationOptions = {
		body: "Background Message body.",
		icon: "/firebase-logo.png"
	}

	self.registration.showNotification(notificationTitle, notificationOptions)
})
