import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";

function AddStore() {
  const [store, setStore] = useState({
    storename: "",
    email: "",
    password: "",
    contactnumber: "",
    description: "",
  });

  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5002/add-store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store),
    });

    const data = await response.json();
    alert(data.message);

    if (data.success) {
      navigate("/store");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-primary">Add a New Store</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-lg custom-form">
        <div className="mb-3">
          <label className="form-label">Store Name</label>
          <input
            type="text"
            name="storename"
            className="form-control input-style"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control input-style"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control input-style"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="text"
            name="contactnumber"
            className="form-control input-style"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control input-style"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 custom-btn"
        >
          Add Store
        </button>
      </form>
    </div>
  );
}

export default AddStore;
