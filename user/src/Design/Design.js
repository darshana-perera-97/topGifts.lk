import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Store from "./Pages/Store";
import StoreDetail from "./Pages/StoreDetail";
import Product from "./Pages/Product";
import ProductDetail from "./Pages/ProductDetail";
import Categories from "./Pages/Categories"; // Page to list categories
import CategoryDetail from "./Pages/CategoryDetail"; // Page for individual category
import OrderFormPage from "./Pages/OrderFormPage";

export default function Design() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:storeId" element={<StoreDetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<OrderFormPage />} />
        <Route path="/product/:productName" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />{" "}
        {/* List of categories */}
        <Route
          path="/categories/:categoryName"
          element={<CategoryDetail />}
        />{" "}
        {/* Products by category */}
      </Routes>
    </Router>
  );
}
