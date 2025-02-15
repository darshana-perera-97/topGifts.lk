import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Navbar from "./Components/Navbar";

export default function Design() {
  const [storeId, setStoreId] = useState(localStorage.getItem("storeId"));

  useEffect(() => {
    const handleStorageChange = () => {
      setStoreId(localStorage.getItem("storeId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={storeId ? <Navigate to="/admin" /> : <Login />}
          />
          <Route
            path="/admin"
            element={storeId ? <Admin /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}
