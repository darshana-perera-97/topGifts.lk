import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryScroll() {
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
    <div className="category-scroll-container">
      <marquee behavior="scroll" direction="left" scrollamount="5">
        {categories.map((category, index) => (
          <Link
            to={`/categories/${encodeURIComponent(category)}`}
            key={index}
            style={{
              marginRight: "120px",
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "18px",
            }}
          >
            {category}
          </Link>
        ))}
      </marquee>
    </div>
  );
}
