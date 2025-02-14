import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StoreDetail() {
  const { storeId } = useParams(); // Get storeId from URL
  const [store, setStore] = useState(null);

  useEffect(() => {
    // Fetch store data (mock API call)
    fetch("http://localhost:5002/store")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const selectedStore = data.data.find(
            (s) => s.storeId === parseInt(storeId)
          );
          setStore(selectedStore);
        }
      })
      .catch((err) => console.error("Error fetching store data:", err));
  }, [storeId]);

  if (!store) return <p>Loading...</p>;

  return (
    <div>
      <h1>{store.storename}</h1>
      <p>{store.description}</p>
      <p>Contact: {store.contactnumber}</p>
      <p>Email: {store.email}</p>
      <h3>Categories:</h3>
      <ul>
        {store.categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
      <h3>Products:</h3>
      <ul>
        {store.products.map((productId) => (
          <li key={productId}>Product ID: {productId}</li>
        ))}
      </ul>
    </div>
  );
}
