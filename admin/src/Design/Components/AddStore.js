import { useState } from "react";

function AddStore() {
  const [store, setStore] = useState({
    storeId: "",
    storename: "",
    email: "",
    password: "",
    contactnumber: "",
    categories: "",
    description: "",
    products: "",
  });

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    store.products = store.products.split(",").map(Number);

    const response = await fetch("http://localhost:5002/add-store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add Store</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Store ID</label>
          <input type="number" name="storeId" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Store Name</label>
          <input type="text" name="storename" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input type="text" name="contactnumber" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Categories</label>
          <input type="text" name="categories" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Products (Comma-separated IDs)</label>
          <input type="text" name="products" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Store</button>
      </form>
    </div>
  );
}

export default AddStore;
