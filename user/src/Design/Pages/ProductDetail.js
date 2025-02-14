import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { productName } = useParams(); // Get product name from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product data
    fetch("http://localhost:5002/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const selectedProduct = data.data.find(
            (p) =>
              p.ProductName.toLowerCase() ===
              decodeURIComponent(productName).toLowerCase()
          );
          setProduct(selectedProduct);
        }
      })
      .catch((err) => console.error("Error fetching product data:", err));
  }, [productName]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.ProductName}</h1>
      <p>
        <strong>Category:</strong> {product.Category}
      </p>
      <p>
        <strong>Description:</strong> {product.Description}
      </p>
      <p>
        <strong>Price:</strong> ${product.Price}
      </p>
      <h3>Included Items:</h3>
      <ul>
        {product.Content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
