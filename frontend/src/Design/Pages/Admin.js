import React from "react";
import DataCardView from "../Layout/DataCardView";
import AddProducts from "../Layout/AddProducts";
import Products from "../Layout/Products";
import { Link, useNavigate } from "react-router-dom";

export default function Admin() {
  return (
    <div>
      <div className="container py-5">
        <DataCardView />
        {/* <AddProducts /> */}
        <Products />
        <button className="btn ">
          <Link to="/addProduct">Add a new Product</Link>
        </button>
      </div>
    </div>
  );
}
