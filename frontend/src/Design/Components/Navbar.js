import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const handleLogout = () => {
    localStorage.removeItem("storeId"); // Remove storeId from localStorage
    localStorage.removeItem("token"); // Optionally, remove the token if you're storing it
    navigate("/login"); // Navigate to the login page
    window.location.reload(); // Refresh the page after logout
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>{" "}
        {/* Logout Button */}
      </ul>
    </nav>
  );
}
