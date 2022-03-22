import React, { createContext } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import Admin from "./Admin"
// import firebase from "./firebase"

// const config = {
// 	apiKey: "AIzaSyD5D_95e3pq02ZPhcpYrSKR635tuSsSW3w",
// 	authDomain: "niced-craves-ordering-system.firebaseapp.com",
// 	projectId: "niced-craves-ordering-system",
// 	storageBucket: "niced-craves-ordering-system.appspot.com",
// 	messagingSenderId: "312614147462",
// 	appId: "1:312614147462:web:31c8a827a9b4600f79c807",
// 	measurementId: "G-KBG9XZMELD"
// }

// const app = initializeApp(config)
const db = getFirestore()

export const MainCtx = createContext()

ReactDOM.render(
	<React.StrictMode>
		<MainCtx.Provider value={{ db }}>
			<App />
		</MainCtx.Provider>
	</React.StrictMode>,
	document.getElementById("root")
)
