import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Store() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/store")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStores(data.data);
      })
      .catch((err) => console.error("Error fetching stores:", err));
  }, []);

  return (
    <div>
      <h1>Stores</h1>
      <ul>
        {stores.map((store) => (
          <li key={store.storeId}>
            <Link to={`/store/${store.storeId}`}>{store.storename}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
