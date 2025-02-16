import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../Layouts/NavBar";

export default function OrderForm() {
  const location = useLocation();
  const { product } = location.state || {};

  // ✅ Move useState to the top, before any conditional returns
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!product) {
    return <p className="text-center mt-4">No product selected.</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      productName: product.ProductName,
      productPrice: product.Price,
      productImage: product.mainImage,
    };

    try {
      const response = await fetch("http://localhost:5002/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully!");
      } else {
        alert(`Failed to place order: ${data.message}`);
      }
    } catch (error) {
      alert("Error placing order!");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h2 className="mb-4">Order Details</h2>
        <div className="row">
          <div className="col-md-5">
            <img
              src={`http://localhost:5002/images/${product.mainImage}`}
              alt={product.ProductName}
              className="img-fluid"
            />
            <h4 className="mt-3">{product.ProductName}</h4>
            <p>Price: Rs.{product.Price}.00</p>
          </div>
          <div className="col-md-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
