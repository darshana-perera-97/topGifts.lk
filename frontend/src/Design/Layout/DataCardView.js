import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DataCardView = () => {
  const [productCount, setProductCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const storeId = localStorage.getItem("storeId");

    // Fetch product data
    fetch("http://localhost:5002/products")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const filteredProducts = data.data.filter(
            (product) => product.StoreID === storeId
          );
          setProductCount(filteredProducts.length);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch sales, orders, and customers data (Replace with actual API)
    fetch("http://localhost:5002/storeStats")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTotalSales(data.totalSales || 0);
          setTotalOrders(data.totalOrders || 0);
          setTotalCustomers(data.totalCustomers || 0);
        }
      })
      .catch((error) => console.error("Error fetching store stats:", error));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Total Products Card */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 mb-4 bg-white rounded">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text display-6">{productCount}</p>
            </div>
          </div>
        </div>

        {/* Total Sales Card */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 mb-4 bg-white rounded">
            <div className="card-body">
              <h5 className="card-title">Total Sales</h5>
              <p className="card-text display-6">Rs. {totalSales.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 mb-4 bg-white rounded">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text display-6">{totalOrders}</p>
            </div>
          </div>
        </div>

        {/* Total Customers Card */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 mb-4 bg-white rounded">
            <div className="card-body">
              <h5 className="card-title">Total Customers</h5>
              <p className="card-text display-6">{totalCustomers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCardView;
