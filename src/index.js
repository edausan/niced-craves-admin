import React, { createContext } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getMessaging, getToken } from "firebase/messaging"
import Admin from "./Admin"

const firebaseConfig = {
	apiKey: "AIzaSyD5D_95e3pq02ZPhcpYrSKR635tuSsSW3w",
	authDomain: "niced-craves-ordering-system.firebaseapp.com",
	projectId: "niced-craves-ordering-system",
	storageBucket: "niced-craves-ordering-system.appspot.com",
	messagingSenderId: "312614147462",
	appId: "1:312614147462:web:31c8a827a9b4600f79c807",
	measurementId: "G-KBG9XZMELD"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore()

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app)

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
// const messaging = getMessaging()
getToken(messaging, {
	vapidKey: "BCBU68xcxNjvAE2As32ZTMa1k4Nf3X6Uw0bU-Tup3PubkPqHHY-kAXtYxNZTYPmVZnjnxWjckYczQJsWwRuSZLg"
})
	.then(currentToken => {
		if (currentToken) {
			// Send the token to your server and update the UI if necessary
			// ...
		} else {
			// Show permission request UI
			console.log("No registration token available. Request permission to generate one.")
			// ...
		}
	})
	.catch(err => {
		console.log("An error occurred while retrieving token. ", err)
		// ...
	})

export const MainCtx = createContext()

ReactDOM.render(
	<React.StrictMode>
		<MainCtx.Provider value={{ db }}>
			<Admin />
		</MainCtx.Provider>
	</React.StrictMode>,
	document.getElementById("root")
)
