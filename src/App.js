import { useEffect, useState } from "react"
import "./App.css"
import { GetToken, onMessageListener, messaging } from "./firebase"

import { getMessaging, onMessage } from "firebase/messaging"

function App() {
	const [tokenFound, setTokenFound] = useState(false)

	useEffect(() => {
		handleToken()
	}, [])

	useEffect(() => {
		onMessage(messaging, payload => {
			console.log("Message received. ", payload)
			// ...
		})
	}, [])

	const handleMessageListener = async () => {
		// const res = await onMessageListener()
		// console.log({ res })
	}

	const handleToken = async () => {
		let data
		try {
			data = await GetToken(setTokenFound)
			if (data) {
				console.log("Token is:", data)
			}

			return data
		} catch (error) {
			console.log(error)
		}
	}

	return <div className="App">Admin</div>
}

export default App
