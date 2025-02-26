import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "bootstrap/js/dist/modal"; // ✅ Import Bootstrap Modal
const StoreManager = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    contactnumber: "",
    password: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5002/store")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStores(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleEditStore = (store) => {
    setSelectedStore(store);
    setFormData({
      contactnumber: store.contactnumber || "",
      password: store.password || "",
      description: store.description || "",
    });

    const modalElement = document.getElementById("editStoreModal");
    const modalInstance = new Modal(modalElement);
    modalInstance.show();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateStore = () => {
    if (!selectedStore) return;

    const updatedStore = {
      ...selectedStore,
      contactnumber: formData.contactnumber,
      password: formData.password,
      description: formData.description,
    };

    fetch(`http://localhost:5002/update-store/${selectedStore.storeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStore),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStores((prevStores) =>
            prevStores.map((s) =>
              s.storeId === selectedStore.storeId ? updatedStore : s
            )
          );
          setSelectedStore(null);
          window.alert("Store updated successfully!");

          const modalElement = document.getElementById("editStoreModal");
          const modalInstance = Modal.getInstance(modalElement);
          modalInstance.hide();
        } else {
          window.alert("Failed to update store: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        window.alert("An error occurred while updating the store.");
      });
  };

  return (
    <div className="store-container">
      <div className="store-card">
        <h2 className="mb-3 text-center">Available Stores</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Fetching stores...</p>
          </div>
        ) : stores.length === 0 ? (
          <p>No stores available. Please add a new store.</p>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.storeId}>
                  <td>{store.storename}</td>
                  <td>{store.contactnumber}</td>
                  <td>{store.email}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm edit-btn"
                      onClick={() => handleEditStore(store)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="custom-btn">
          <Link to="/add">Add a Store</Link>
        </button>
      </div>
      <div></div>

      {/* ✅ Bootstrap Modal for Editing Store */}
      <div className="modal fade" id="editStoreModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h5 className="modal-title">Edit Store</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedStore && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Contact Number:</label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      name="contactnumber"
                      value={formData.contactnumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control rounded-pill"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-success update-btn"
                onClick={handleUpdateStore}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManager;
