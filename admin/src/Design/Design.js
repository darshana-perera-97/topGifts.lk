import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddStore from "./Components/AddStore";
import EditStore from "./Components/EditStore";
import Login from "./Components/Login";

export default function Design() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/store"
          element={isAuthenticated ? <EditStore /> : <Navigate to="/" />}
        />
        <Route
          path="/add"
          element={isAuthenticated ? <AddStore /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
