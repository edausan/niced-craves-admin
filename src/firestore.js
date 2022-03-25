import {
  onSnapshot,
  collection,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
} from 'firebase/firestore';

import { useEffect, useState } from 'react';
const db = getFirestore();

// Get Products
const GetData = ({ colRef }) => {
  const ref = collection(db, colRef);
  const [data, setData] = useState([]);

  useEffect(() => {
    onSnapshot(ref, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(docs);
    });
  }, []);

  return {
    best_sellers: data.filter((item) => item.is_best_seller),
    products: data.filter((item) => !item.is_best_seller),
  };
};

// Add Product
const AddProduct = ({ colRef, params }) => {
  const ref = collection(db, colRef);
  addDoc(ref, { ...params });
};

// Add Orders
const Checkout = () => {
  const [data, setData] = useState({ cart: [], userInfo: {} });

  useEffect(() => {
    // console.log({ data });
    if (data.cart.length > 0) handleAdd();
  }, [data]);

  const handleAdd = () => {
    console.log({ handleAdd: data });
    const ref = collection(db, 'orders');
    try {
      addDoc(ref, { ...data });
    } catch (error) {
      console.log(error);
    }
  };

  return { setData };
};

// Update Order
const UpdateOrder = async ({ id, params = { col: null, value: null } }) => {
  const [updatedOrder, setUpdatedOrder] = useState(null);

  useEffect(() => {
    console.log({ id, params });
    if (id && params.value) {
      handleUpdate();
    }
  }, [id, params]);

  const handleUpdate = async () => {
    const orderRef = doc(db, 'orders', id);
    try {
      const res = await updateDoc(orderRef, { status: params.value });
      console.log({ res });
      setUpdatedOrder(res);
    } catch (error) {
      console.log();
    }
  };

  return { updatedOrder };
};

// Get Orders
const GetOrders = () => {
  const ref = collection(db, 'orders');
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(ref, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (docs.length > 0) {
          localStorage.setItem('orders', JSON.stringify(docs));
          const local_orders = JSON.parse(localStorage.getItem('orders'));
          setData(local_orders);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { data };
};

export { GetData, AddProduct, Checkout, GetOrders, UpdateOrder };
