import React, { createContext } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
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

// messaging.getToken({
// 	vapidKey: "BCBU68xcxNjvAE2As32ZTMa1k4Nf3X6Uw0bU-Tup3PubkPqHHY-kAXtYxNZTYPmVZnjnxWjckYczQJsWwRuSZLg"
// })
export const MainCtx = createContext()

ReactDOM.render(
	<React.StrictMode>
		<MainCtx.Provider value={{ db }}>
			<Admin />
		</MainCtx.Provider>
	</React.StrictMode>,
	document.getElementById("root")
)
