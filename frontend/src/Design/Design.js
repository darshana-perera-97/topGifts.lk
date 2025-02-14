import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Navbar from "./Components/Navbar"; // Optional: Navigation Component

export default function Design() {
  // Check if storeId is in localStorage
  const storeId = localStorage.getItem("storeId");

  return (
    <Router>
      <div>
        <Navbar /> {/* Optional: Add a navigation bar for easy routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* If storeId is not found, redirect to login */}
          <Route
            path="/login"
            element={storeId ? <Navigate to="/" /> : <Login />}
          />
          {/* If storeId is not found, redirect to login */}
          <Route
            path="/admin"
            element={storeId ? <Admin /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}
