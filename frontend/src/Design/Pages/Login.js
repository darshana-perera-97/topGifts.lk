import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // To navigate after login

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5002/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      setSuccess(data.success);
      localStorage.setItem("token", data.token);
      localStorage.setItem("storeId", data.storeId);

      console.log("Store ID saved:", data.storeId);

      // Wait for localStorage update, then navigate
      setTimeout(() => {
        navigate("/admin");
        window.location.reload(); // Ensures correct re-render
      }, 500);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="container mt-5">
      {!success && (
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          {message && <p className="mt-3 text-center text-danger">{message}</p>}
        </div>
      )}
    </div>
  );
}
