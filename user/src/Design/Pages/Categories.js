import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const uniqueCategories = [
            ...new Set(data.data.map((product) => product.Category)),
          ];
          setCategories(uniqueCategories);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div>
      <h1>Product Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/categories/${encodeURIComponent(category)}`}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
