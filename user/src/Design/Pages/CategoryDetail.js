import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CategoryDetail() {
  const { categoryName } = useParams(); // Get category name from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const filteredProducts = data.data.filter(
            (product) =>
              product.Category.toLowerCase() ===
              decodeURIComponent(categoryName).toLowerCase()
          );
          setProducts(filteredProducts);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [categoryName]);

  return (
    <div>
      <h1>Products in {decodeURIComponent(categoryName)}</h1>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.ProductName}>
              <Link to={`/product/${encodeURIComponent(product.ProductName)}`}>
                {product.ProductName} - ${product.Price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
