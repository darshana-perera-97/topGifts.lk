import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ProductName}>
            <Link to={`/product/${encodeURIComponent(product.ProductName)}`}>
              {product.ProductName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
