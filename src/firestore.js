import { onSnapshot, collection, addDoc } from "firebase/firestore"

import { useEffect, useState } from "react"

// Get Products
const GetData = ({ colRef, db }) => {
	const ref = collection(db, colRef)
	const [data, setData] = useState([])

	useEffect(() => {
		onSnapshot(ref, snapshot => {
			const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setData(docs)
		})
	}, [])

	return {
		best_sellers: data.filter(item => item.is_best_seller),
		products: data.filter(item => !item.is_best_seller)
	}
}

// Add Product
const AddProduct = ({ colRef, db, params }) => {
	const ref = collection(db, colRef)
	addDoc(ref, { ...params })
}

// Add Orders
const Checkout = ({ db }) => {
	const [data, setData] = useState({ cart: [], userInfo: {} })

	useEffect(() => {
		// console.log({ data });
		if (data.cart.length > 0) handleAdd()
	}, [data])

	const handleAdd = () => {
		console.log({ handleAdd: data })
		const ref = collection(db, "orders")
		try {
			addDoc(ref, { ...data })
		} catch (error) {
			console.log(error)
		}
	}

	return { setData }
}

// Get Orders
const GetOrders = ({ db }) => {
	const ref = collection(db, "orders")
	const [data, setData] = useState([])

	useEffect(() => {
		onSnapshot(ref, snapshot => {
			const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setData(docs)
		})
	}, [])

	return { data }
}

export { GetData, AddProduct, Checkout, GetOrders }
