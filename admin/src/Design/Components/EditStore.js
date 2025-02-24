import React, { useState, useEffect } from "react";
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

  // ✅ Fetch all stores from the backend
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

  // ✅ Handle store selection for editing
  const handleEditStore = (store) => {
    setSelectedStore(store);
    setFormData({
      contactnumber: store.contactnumber || "",
      password: store.password || "",
      description: store.description || "",
    });

    // ✅ Initialize and show Bootstrap modal
    const modalElement = document.getElementById("editStoreModal");
    const modalInstance = new Modal(modalElement);
    modalInstance.show();
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle store update
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

          // ✅ Close modal after updating
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
    <div className="container mt-4">
      <h2 className="mb-3">Available Stores</h2>

      {/* ✅ Show Loading Indicator */}
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
        <table className="table table-striped">
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
                    className="btn btn-primary btn-sm"
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

      {/* ✅ Bootstrap Modal for Editing Store */}
      <div
        className="modal fade"
        id="editStoreModal"
        tabIndex="-1"
        aria-labelledby="editStoreModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editStoreModalLabel">
                Edit Store
              </h5>
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
                      className="form-control"
                      name="contactnumber"
                      value={formData.contactnumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control"
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
              <button className="btn btn-success" onClick={handleUpdateStore}>
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
