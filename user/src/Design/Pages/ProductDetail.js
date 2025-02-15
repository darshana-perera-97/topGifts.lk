import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // Check if Content is an array before using map
  const contentItems = Array.isArray(product.Content)
    ? product.Content
    : product.Content.split(","); // If it's a string, split by commas

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h1 className="mb-3">{product.ProductName}</h1>
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
            {contentItems.length > 0 ? (
              contentItems.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <p>No content available.</p>
            )}
          </ul>
        </div>
        <div className="col-md-6">
          <img
            // src={product.mainImage}
            src={`http://localhost:5002/images/${product.mainImage}`}
            alt={product.ProductName}
            className="img-fluid mb-3"
          />
          <h4>Product Images:</h4>
          <div className="row">
            {product.productImages &&
              product.productImages.map((image, index) => (
                <div className="col-4" key={index}>
                  <img
                    src={`http://localhost:5002/images/${image}`}
                    // src={image}
                    alt={`product-${index}`}
                    className="img-fluid mb-3"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
